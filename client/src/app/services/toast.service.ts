import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(message: string): void {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#323232';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
}
