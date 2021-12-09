import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CadastroService } from 'src/app/services/cadastro.service';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public load = false;

  validationMessages = {
    name: [
      {
        type: 'required',
        message: 'Insira o nome completo'
      }
    ],
    email: [
      {
        type: 'required',
        message: 'Insira seu e-mail'
      },
      {
        type: 'pattern',
        message: 'Por favor, insira um e-mail válido'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Senha obrigatória'
      },
      {
        type: 'minlength',
        message: 'Tamanho mínimo de 6 caracteres.'
      },
      {
        type: 'maxlength',
        message: 'Tamanho máximo de 30 caracteres'
      }
    ],
  }

  cadastroForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cadastroService: CadastroService,
    private readonly servicesService: ServicesService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.loading();
    this.cadastroForm = this.formBuilder.group(
      {
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^([\\w\\.\\-]+)@([\\w\\-]+)?((\\.(\\w){0,1000}){0,5})()$'
            )
          ]),
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ])
        )
      }
    );
  }

  async create(cadastro: any) {
    const { name, email, password } = cadastro;
    this.cadastroService.create({
      name,
      email,
      password
    }).subscribe(
      () => {
        this.snackMessage('Usuário cadastrado com sucesso!', 'green-snackbar');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackMessage(error.error.message, 'red-snackbar');
      }
    );
    this.cadastroForm.reset();
  }

  // SnakBar
  snackMessage(message: string, classValue: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [classValue, 'login-snackbar'],
    });
  }

  loading() {
    this.load = true;

    setTimeout(() => {
        this.load = false
    }, 1000)
  }
}
