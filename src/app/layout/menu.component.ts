import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-menu',
    imports: [RouterModule, CommonModule],
    templateUrl: './menu.component.html',
})

export class MenuComponent {
    constructor(private auth: AuthService, private router: Router) { }

    isMenuOpen: boolean = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    logout() {
        this.auth.logout().subscribe(
            () => {
                this.router.navigate(['/login']);
            },
            error => {
                sessionStorage.clear();
                this.router.navigate(['/login']);
            }
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        const width = event.target.innerWidth;
        if (width >= 768 && this.isMenuOpen) {
            this.isMenuOpen = false;
        }
    }

    ngOnInit() {
        if (window.innerWidth >= 768) {
            this.isMenuOpen = false;
        }
    }

    onNavigate() {
        if (window.innerWidth < 768) {
            this.isMenuOpen = false;
        }
    }
}
