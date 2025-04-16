import Block from '../../services/Block'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { getForm, validateInput } from '../../services/validateForm'
import authController from '../../store/AuthController'
import { SignInRequest } from '../../types/Auth'
import { Link } from '../../components/Link'
import { ROUTES } from '../../services/routersList'
import { router } from '../../services/Router'

export class AuthPage extends Block {
  constructor() {
    super({
      Button: new Button({
        text: 'Войти',
        onClick: (e: Event) => {
          e.preventDefault()
          const data = getForm('login-form')
          authController.singin(data as SignInRequest)
        }
      }),
      Link: new Link({
        text: 'Нет профиля',
        onClick: () => {
          router.go(ROUTES.SIGNUP)
        }
      }),
      InputLogin: new Input({
        type: 'text',
        id: 'login',
        name: 'login',
        placeholder: 'логин',
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement)
        }
      }),
      InputPassword: new Input({
        type: 'password',
        id: 'password',
        name: 'password',
        placeholder: 'пароль',
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement)
        }
      })
    })
  }

  override render(): string {
    return `<div class="container">
                <main class="main">
                    <h1>Вход</h1>
                    <form class="form" id="login-form">
                        <label for="login">Логин</label>
                        {{{InputLogin}}}
                        <span class="error"></span>
                        <label for="password">Пароль</label>
                        {{{InputPassword}}}
                        <span class="error"></span>
                     {{{Button }}}
                    </form>
                   {{{Link}}}
                </main>
                </div>`
  }
}
