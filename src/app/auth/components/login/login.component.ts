import { AuthService } from "../..";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "bc-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        this.isLoading = true;
        this.errorMessage = "";
        const { identifier, password } = this.loginForm.value;
        const success = await this.authService.login(identifier, password);

        if (success) {
          await this.router.navigate(["/feed"]);
        } else {
          this.errorMessage = "Login failed. Please check your credentials.";
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error) {
          this.errorMessage = error.message || "An unexpected error occurred";
        } else {
          this.errorMessage = "An unexpected error occurred";
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
