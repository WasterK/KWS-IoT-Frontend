import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected property name
})
export class SignupComponent {
  username: string;
  password: string;
  confirmPassword: string;

  onSubmit() {
    // Add your form submission logic here
    // You can access the entered values using this.username, this.password, this.confirmPassword
    // Implement any additional validation or processing as needed
  }
}
