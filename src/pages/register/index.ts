import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Block from "../../services/Block";
import { getForm, validateInput } from "../../services/validateForm";
import authController from "../../store/AuthController";
import { SignUpRequest } from "../../types/Auth";
export interface ISignUp {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  passwordTwo: string;
  phone: string;
}
export class Register extends Block {
  constructor() {
    super({
      InputAvatar: new Input({
        type: "text",
        id: "login",
        name: "login",
        placeholder: "логин",
      }),
      InputName: new Input({
        type: "text",
        id: "name",
        name: "first_name",
        placeholder: "имя",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputSecondName: new Input({
        type: "text",
        id: "lastname",
        name: "second_name",
        placeholder: "фамилия",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputLogin: new Input({
        type: "text",
        id: "login-register",
        name: "login",
        placeholder: "логин",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputEmail: new Input({
        type: "text",
        id: "email",
        name: "email",
        placeholder: "email",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputPhone: new Input({
        type: "tel",
        id: "phone",
        name: "phone",
        placeholder: "телефон",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputPassword: new Input({
        type: "password",
        id: "password-one",
        name: "password",
        placeholder: "пароль",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputNewPassword: new Input({
        type: "password",
        id: "password-two",
        name: "newPassword",
        placeholder: "пароль",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      Button: new Button({
        text: "Зарегистироваться",
        onClick: (e: Event) => {
          e.preventDefault();
          const data = getForm("register-form");
          const { login, email, first_name, second_name, phone, password } =
            data as SignUpRequest;
          const params: SignUpRequest = {
            login,
            email,
            first_name,
            second_name,
            phone,
            password,
          };
          authController.signup(params);
        },
      }),
    });
  }
  protected render(): string {
    return `<div class="container">
                <main class="main">
                    <h1>Вход</h1>
                    <form class="form" id="register-form">
                        <label for="first_name">Имя</label>
                        {{{InputName}}}   
                        <span class="error"></span>
                        <label for="second_name">Фамилия</label>
                         {{{InputSecondName}}} 
                         <span class="error"></span>
                        <label for="login">Логин</label>  
                       {{{InputLogin}}}
                       <span class="error"></span>
                        <label for="email">E-mail</label>  
                       {{{InputEmail}}}
                       <span class="error"></span>
                        <label for="phone">Телефон</label>
                        {{{InputPhone}}} 
                        <span class="error"></span> 
                        <label for="password">Пароль</label>
                        {{{InputPassword}}} 
                        <span class="error"></span> 
                        <label for="password-two">Повторите пароль</label>
                        {{{InputNewPassword}}}  
                        {{{ Button }}}  
                    </form>
                </main>
                </div>`;
  }
}
