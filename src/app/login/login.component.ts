import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly isSignIn = signal(true);

  protected showSignIn(): void {
    this.isSignIn.set(true);
  }

  protected showSignUp(): void {
    this.isSignIn.set(false);
  }

  protected submit(): void {
    // Authentication will be connected when the backend is available.
  }
}
