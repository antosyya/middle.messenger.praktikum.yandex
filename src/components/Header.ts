import Block from "../services/Block";
export class Header extends Block {
  constructor(props = {}) {
    super(props);
  }
  override render(): string {
    return `<header class="header"><nav><ul class="menu"><li><a href="/register" >Регистрация</a></li><li><a href="/login" >Вход</a></li><li><a href="/profile" >Профиль</a></li><li><a href="/chat" >Чаты</a></li><li><a href="/not-found" >Страница не найдена</a></li><li><a href="/error" >Ошибка</a></li></ul></nav></header>`;
  }
}
