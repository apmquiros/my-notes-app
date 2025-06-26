import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  tags: string[] = [];
  selectedTag: string | null = null;
  searchTerm: string = '';
  
  
  constructor(
    private noteService: NoteService, 
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      this.extractTags(data);
      this.loadFiltersFromStorage();
      this.applyFilters();
    });

  }

  loadFiltersFromStorage(): void {
    this.searchTerm = localStorage.getItem('searchTerm') || '';
    this.selectedTag = localStorage.getItem('selectedTag');
  }

  saveFiltersToStorage(): void {
    localStorage.setItem('searchTerm', this.searchTerm);
    if (this.selectedTag) {
      localStorage.setItem('selectedTag', this.selectedTag);
    } else {
      localStorage.removeItem('selectedTag');
    }
  }

  extractTags(notes: Note[]): void {
    const tagSet = new Set<string>();
    notes.forEach(note => {
      if (note.tags) {
        note.tags.split(',').forEach(tag => tagSet.add(tag.trim()));
      }
    });
    this.tags = Array.from(tagSet);
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.saveFiltersToStorage();
    this.applyFilters();
  }

  clearTagFilter(): void {
    this.selectedTag = null;
    this.saveFiltersToStorage();
    this.applyFilters();
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.saveFiltersToStorage();
    this.applyFilters();
  }

  applyFilters(): void {

    let results = [...this.notes];

    // Apply search filter
    if (this.searchTerm.trim()) {
      results = results.filter(note =>
        note.title.toLowerCase().includes(this.searchTerm) ||
        note.content.toLowerCase().includes(this.searchTerm)
      );
    }
    // Apply tag filter
    if (this.selectedTag) {
      results = results.filter(note =>
        note.tags?.split(',').map(tag => tag.trim()).includes(this.selectedTag!)
      );
    }

    this.filteredNotes = results;
  }

  resetAll(): void {
    this.searchTerm = '';
    this.selectedTag = null;
    this.saveFiltersToStorage();
    this.applyFilters();
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm.trim()) return text;
    const term = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }


  deleteNote(id: number): void {
    if (confirm('Delete this note?')) {
      this.noteService.deleteNote(id).subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== id);
        this.applyFilters(); 
        this.toast.show('Note deleted');
      });
    }
  }
}
