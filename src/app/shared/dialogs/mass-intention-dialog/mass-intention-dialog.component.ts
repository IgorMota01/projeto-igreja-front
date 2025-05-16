import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-mass-intention-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './mass-intention-dialog.component.html',
  styleUrl: './mass-intention-dialog.component.scss'
})
export class MassIntentionDialogComponent {

  intentionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    intention: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<MassIntentionDialogComponent>) { }

  submitForm() {
    if (this.intentionForm.valid) {
      const formData = this.intentionForm.value;
      console.log('Enviar intenção de missa:', formData);
      this.dialogRef.close(formData); // poderia disparar um serviço aqui
    }
  }

  close() {
    this.dialogRef.close();
  }
}
