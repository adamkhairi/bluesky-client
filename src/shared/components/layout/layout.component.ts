import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../app/auth';

@Component({
  selector: 'bc-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private authService = inject(AuthService);

  isAuthenticated$ = this.authService.isAuthenticated$;

  logout() {
    this.authService.logout();
  }
}
