import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  noteId!: number;
  note: Note = { title: '', content: '', tags: '' };

  constructor(
    private toast: ToastService, 
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noteId = +this.route.snapshot.paramMap.get('id')!;
    this.noteService.getNote(this.noteId).subscribe(data => this.note = data);
  }

  saveNote() {
    this.noteService.updateNote(this.noteId, this.note).subscribe(() => {
      this.toast.show('Note updated!');
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    if (confirm('Discard changes and go back?')) {
      this.toast.show('Cancelled');
      this.router.navigate(['/']);
    }
  }
}
