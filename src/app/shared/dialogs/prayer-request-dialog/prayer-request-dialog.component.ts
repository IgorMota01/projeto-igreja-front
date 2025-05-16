import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-prayer-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './prayer-request-dialog.component.html',
  styleUrl: './prayer-request-dialog.component.scss'
})
export class PrayerRequestDialogComponent {

  prayerRequestForm = new FormGroup({
    name: new FormControl('', Validators.required),
    intention: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<PrayerRequestDialogComponent>) { }

  submitForm() {
    if (this.prayerRequestForm.valid) {
      const formData = this.prayerRequestForm.value;
      console.log('Enviar intenção de missa:', formData);
      this.dialogRef.close(formData); // poderia disparar um serviço aqui
    }
  }

  close() {
    this.dialogRef.close();
  }
}
