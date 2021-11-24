import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ServicesService } from 'src/app/services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'Insira o email'
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

  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly servicesService: ServicesService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
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

  async logar(data: any) {
    const { email, password } = data;
    await this.loginService.login({
      email,
      password
    }).subscribe(
      (data) => {
        this.servicesService.store(data.token);
        this.snackMessage('Bem vindo!', 'blue-snackbar');
        this.router.navigate(['/home']);
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.snackMessage(error.error.error, 'red-snackbar');
      }
    );
  }

  // SnakBar
  snackMessage(message: string, classValue: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [classValue, 'login-snackbar'],
    });
  }

}
