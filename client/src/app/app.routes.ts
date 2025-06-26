import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { EditNoteComponent } from './pages/edit-note/edit-note.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateNoteComponent },
  { path: 'edit/:id', component: EditNoteComponent }
];
