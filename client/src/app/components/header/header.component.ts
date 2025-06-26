import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  theme: 'light' | 'dark' = 'light';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.className = this.theme;
    localStorage.setItem('theme', this.theme);
  }

  loadTheme(): void {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.theme = saved || 'light';
    document.body.className = this.theme;
  }
}
