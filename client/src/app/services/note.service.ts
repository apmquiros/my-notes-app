import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private apiUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {}

  //GET all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  //GET a single note by ID
  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  //POST (create) a new note
  createNote(note: Note): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  //PUT (update) an existing note
  updateNote(id: number, note: Note): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, note);
  }

  //DELETE a note
  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}