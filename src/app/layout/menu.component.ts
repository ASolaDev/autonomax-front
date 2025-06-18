import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-menu',
    imports: [RouterModule, CommonModule],
    templateUrl: './menu.component.html'
})

export class MenuComponent {
  isMobileMenuOpen = false;

  constructor(private auth: AuthService, private router: Router) { }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['/login']),
      () => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }
}


