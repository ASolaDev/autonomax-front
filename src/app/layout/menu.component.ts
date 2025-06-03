import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-menu',
    imports: [RouterModule],
    templateUrl: './menu.component.html'
})

export class MenuComponent {

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout().subscribe(
            () => {
                this.router.navigate(['/login'])
            },
            error => {
                sessionStorage.clear()
                this.router.navigate(['/login'])
            }
        )
    }
}
