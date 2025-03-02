import Block from "../services/Block";

export class ChatItem extends Block {
  constructor() {
    super();
  }
  protected override render(): string {
    return `<div class="chat-list-item" onclick="openChat('Чат 3')">
                <div class="avatar-wrap avatar-wrap-chat"><img src="/img/user.svg" alt="Avatar"></div>
                Иванова
            </div>`;
  }
}
