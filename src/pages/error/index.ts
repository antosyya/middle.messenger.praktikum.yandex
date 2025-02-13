import { Header } from "../../components/Header";
import Block from "../../services/Block";

export class ErrorPage extends Block {
  constructor() {
    super({ HeaderBlock: new Header() });
  }
  protected override render(): string {
    return `<div class="container">
                    {{{HeaderBlock}}}
                    <main class="main">
                        <h1 class="big-text">500</h1>
                        <p>Что-то случилось...</p>
                        <p>Мы уже работаем над этим</p>
                    </main>
                </div>`;
  }
}
