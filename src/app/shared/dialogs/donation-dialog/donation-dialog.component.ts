import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './donation-dialog.component.html',
  styleUrl: './donation-dialog.component.scss'
})
export class DonationDialogComponent {

  donationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    paymentMethod: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<DonationDialogComponent>) {

  }

  submitForm() {
    if (this.donationForm.valid) {
      const formData = this.donationForm.value;
      console.log('Enviar intenção de doação:', formData);
      this.dialogRef.close(formData); // poderia disparar um serviço aqui
    }
  }

  close() {
    this.dialogRef.close();
  }
}
