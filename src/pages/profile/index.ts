import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import Block from "../../services/Block";
import { getForm, validateInput } from "../../services/validateForm";

// export { default as Profile } from "./profile.hbs?raw";
export class Profile extends Block {
  constructor() {
    super({
      HeaderBlock: new Header(),
      InputAvatar: new Input({
        type: "file",
        id: "avatar",
        name: "avatar",
        placeholder: "фото",
        className: "avatar",
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
      InputOldPassword: new Input({
        type: "password",
        id: "old-password",
        name: "oldPassword",
        placeholder: "пароль",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputNewPassword: new Input({
        type: "password",
        id: "new-password",
        name: "newPassword",
        placeholder: "пароль",
        className: "input",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      Button: new Button({
        text: "Изменить",
        onClick: () => {
          getForm("profile-form");
        },
      }),
      // ButtonOut: new Button({ text: "Выйти" }),
    });
  }
  protected render(): string {
    return `<div class="container">
                    {{{HeaderBlock}}}
                    <main class="main">
                        <h1>Профиль</h1>
                    
                        <from class="form" id="profile-form">
                            <div class="avatar-wrap"></div>
                            {{{InputAvatar}}} 
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
                            <label for="oldPassword">Старый пароль</label>
                            {{{InputOldPassword}}}  

                            <label for="newPassword">Новый пароль</label>
                            {{{InputNewPassword}}}   
                            {{{ Button }}}  
                            <a class="btn-out" href="/login.html" >Выйти</a>
                        </from>
                    </main>
                    </div>`;
  }
}
