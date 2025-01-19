import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ProductsModel } from '../../../../core/models/products/product-model';
import { TokenMethodsUtils } from '../../../../../shared/utils/token-methods';

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

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setupImages();
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      authToken: [null, Validators.required],
    })
  }

  setupImages(): void {
    this.loginBackground = LoginComponent.LOGIN_BACKGROUND;
    this.logoLogin = LoginComponent.LOGO_IMAGE;
  }

  signIn(): void {
    if (!this.loginForm.value.authToken) {
      const options: SweetAlertOptions = {
        html: `
            <span>
              <p class="swal-expirated-token">
                Please, fill required fields.
              </p>
            </span>
          `,
        toast: false,
        position: 'center',
        showConfirmButton: true,
        timerProgressBar: true,
      };
      Swal.fire(options);
      return;
    }
    this.isLoading = true;
    this.authService.signInWithAuthorizationKey(this.loginForm.value.authToken).subscribe({
      next: (res) => {
        TokenMethodsUtils.saveToken(this.loginForm.value.authToken);
        if (TokenMethodsUtils.getToken())
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/products']);
          }, 2000);
      },
      error: () => {
        const options: SweetAlertOptions = {
          html: `
              <span>
                <p class="swal-expirated-token">
                  It was not possible to sign in due to an error with the server, please try again later.
                </p>
              </span>
            `,
          toast: false,
          position: 'center',
          showConfirmButton: true,
          timerProgressBar: true,
        };
        Swal.fire(options);
        this.isLoading = false;
      }
    })
      .add(() => {
        this.changeDetector.detectChanges();
      })
  }
}
