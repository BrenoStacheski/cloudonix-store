import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenMethodsUtils } from '../../../../../shared/utils/token-methods';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    TokenMethodsUtils.signOut();
    this.router.navigate(['/login']);
  }
}
