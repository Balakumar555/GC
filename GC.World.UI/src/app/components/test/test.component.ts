import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

registerForm: FormGroup;
  submitted = false;

  countries = [
    { value: '', label: 'Select Country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
        password: [''],
        confirmPassword: [''],
      dateOfBirth: ['', Validators.required],
     gender: ['', Validators.required],
       country: [''],
       address: [''],
       city: [''],
      postalCode: [''],
       agreeToTerms: [false],
       receiveNewsletter: [false],
       preferredContact: ['']
    }, 
    //{ validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  // Custom validator for password confirmation
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }

    // Process form data
    console.log('Registration Data:', this.registerForm.value);
    alert('Registration successful!');
    
    // Reset form after successful submission
    this.submitted = false;
    this.registerForm.reset();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}