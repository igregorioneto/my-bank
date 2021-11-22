import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

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
        message: 'Insira o nome completo'
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
    private readonly loginService: LoginService
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
    this.loginService.login(data).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}
