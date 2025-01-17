import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public static LOGIN_BACKGROUND: string = "assets/images/login_background.jpg";
  public static LOGO_IMAGE: string = "assets/images/logo_cloudonix.jpg";

  loginForm!: FormGroup;

  logoLogin!: string;
  loginBackground!: string;
  cloudonixVersion: string = environment.CLOUDONIX_VERSION;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setupImages();
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      authToken: [null],
    })
  }

  setupImages(): void {
    this.loginBackground = LoginComponent.LOGIN_BACKGROUND;
    this.logoLogin = LoginComponent.LOGO_IMAGE;
  }

  signIn(): void {
    this.authService.signInWithAuthorizationKey(this.loginForm.value.authToken).subscribe({
      next: () => {
        this.router.navigate(['/items']);
      }
    })
  }
}
