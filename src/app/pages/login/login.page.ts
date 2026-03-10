import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
    email = '';
    password = '';
    error = '';
    loading = false;

    constructor(private authService: AuthService, private router: Router) { }

    async onLogin() {
        this.loading = true;
        this.error = '';
        try {
            await this.authService.login(this.email, this.password);
            this.router.navigate(['/admin']);
        } catch (err: any) {
            console.error(err);
            this.error = 'Invalid email or password. Please try again.';
        } finally {
            this.loading = false;
        }
    }
}
