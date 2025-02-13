import { Header } from "../../components/Header";
import Block from "../../services/Block";

export class NotFound extends Block {
  constructor() {
    super({ HeaderBlock: new Header() });
  }
  protected override render(): string {
    return `<div class="container">
                {{{HeaderBlock}}}
                <main class="main">
                    <h1 class="big-text">404</h1>
                    <p>Такой страницы нет</p>
                </main>
            </div>`;
  }
}
