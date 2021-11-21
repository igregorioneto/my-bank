import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CadastroService } from 'src/app/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

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
        message: 'Tamanho mínimo de 10 caracteres.'
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
  ) { }

  ngOnInit(): void {
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
            Validators.minLength(4),
            Validators.maxLength(30)
          ])
        )
      }
    );
  }

  async create(cadastro: any) {
    const { name, email, password } = cadastro;
    console.log(cadastro);
    this.cadastroService.create({
      name,
      email,
      password
    }).subscribe(() => {});
  }

}
