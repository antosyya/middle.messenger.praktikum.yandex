import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import Block from "../../services/Block";
import { getForm, validateInput } from "../../services/validateForm";

export class Register extends Block {
  constructor() {
    super({
      HeaderBlock: new Header(),
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
        onClick: () => {
          getForm("register-form");
        },
      }),
    });
  }
  protected render(): string {
    return `<div class="container">
                {{{HeaderBlock}}}
                <main class="main">
                    <h1>Вход</h1>
                    <from class="form" id="register-form">
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
                    </from>
                </main>
                </div>`;
  }
}
