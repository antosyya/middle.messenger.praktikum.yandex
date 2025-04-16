import Block from '../../services/Block'

export class NotFound extends Block {
  constructor() {
    super()
  }
  protected override render(): string {
    return `<div class="container">
                <main class="main">
                    <h1 class="big-text">404</h1>
                    <p>Такой страницы нет</p>
                </main>
            </div>`
  }
}
