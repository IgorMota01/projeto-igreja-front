import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatequeseService } from '../../../services/catechesis.service';
import { LayoutComponent } from '../../../shared/layout/layout.component';

@Component({
  selector: 'app-catechesis',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutComponent
  ],
  templateUrl: './catechesis.component.html',
  styleUrls: ['./catechesis.component.scss']
})
export class CatechesisComponent {
  form: FormGroup;
  showResponsavelField: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private service: CatequeseService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: ['', [Validators.required, Validators.min(5), Validators.max(18)]],
      responsavel: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      observacoes: ['']
    });
  }

  checkAge() {
    const idade = this.form.get('idade')?.value;
    this.showResponsavelField = idade && idade < 18;
    
    if (!this.showResponsavelField) {
      this.form.get('responsavel')?.reset();
      this.form.get('responsavel')?.clearValidators();
    } else {
      this.form.get('responsavel')?.setValidators(Validators.required);
    }
    this.form.get('responsavel')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.cadastrar(this.form.value).subscribe({
        next: () => {
          alert('Inscrição realizada com sucesso!');
          this.form.reset();
          this.showResponsavelField = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Ocorreu um erro ao realizar a inscrição. Por favor, tente novamente.');
        }
      });
    }
  }
}