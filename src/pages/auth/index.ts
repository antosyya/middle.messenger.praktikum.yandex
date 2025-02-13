import Block from "../../services/Block";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { getForm, validateInput } from "../../services/validateForm";
export class AuthPage extends Block {
  constructor() {
    super({
      HeaderBlock: new Header(),
      Button: new Button({
        text: "Войти",
        onClick: () => {
          getForm("login-form");
        },
      }),
      InputLogin: new Input({
        type: "text",
        id: "login",
        name: "login",
        placeholder: "логин",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
      InputPassword: new Input({
        type: "password",
        id: "password",
        name: "password",
        placeholder: "пароль",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
    });
  }

  override render(): string {
    return `<div class="container">
            {{{HeaderBlock}}}
                <main class="main">
                    <h1>Вход</h1>
                    <from class="form" id="login-form">
                        <label for="login">Логин</label>
                        {{{InputLogin}}}
                        <span class="error"></span>
                        <label for="password">Пароль</label>
                        {{{InputPassword}}}
                        <span class="error"></span>
                     {{{Button }}}
                    </from>
                    <a href="/register.html" >Нет профиля</a>
                </main>
                </div>`;
  }
}
