import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  title = '';
  content = '';
  tags = '';

  constructor(private toast: ToastService, private noteService: NoteService, private router: Router) {}

  submitNote() {
    this.noteService.createNote({ title: this.title, content: this.content, tags: this.tags })
      .subscribe(() => {
        this.toast.show('Note saved!');
        this.router.navigate(['/']);
      });
  }
  
  cancel(): void {
    if (confirm('Cancel and go back?')) {
      this.toast.show('Cancelled');
      this.router.navigate(['/']);
    }
  }
}
