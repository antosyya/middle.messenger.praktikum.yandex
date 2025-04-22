import Block from '../services/Block'
import { router } from '../services/Router'
import { ROUTES } from '../services/routersList'
import { Link } from './Link'
export class Header extends Block {
  constructor() {
    super({
      Link: new Link({
        text: 'Регистрация',
        onClick: () => {
          router.go(ROUTES.SIGNUP)
        }
      }),
      LinkIn: new Link({
        text: 'Вход',
        onClick: () => {
          router.go(ROUTES.LOGIN)
        }
      }),
      LinkProfile: new Link({
        text: 'Профиль',
        onClick: () => {
          router.go(ROUTES.PROFILE)
        }
      }),
      LinkChat: new Link({
        text: 'Чаты',
        onClick: () => {
          router.go(ROUTES.CHATS)
        }
      })
    })
  }
  override render(): string {
    return `<header class="header"><nav><ul class="menu"><li>{{{Link}}}</li><li>{{{LinkIn}}}</li><li>{{{LinkProfile}}}</li><li>{{{LinkChat}}}</li><li><a href="/not-found" >Страница не найдена</a></li><li><a href="/error" >Ошибка</a></li></ul></nav></header>`
  }
}
