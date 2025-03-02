import { Button } from "../../components/Button";
import { ChatItem } from "../../components/ChatItem";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import Block from "../../services/Block";
import { getForm, validateInput } from "../../services/validateForm";

export class ChatPage extends Block {
  constructor() {
    super({
      HeaderBlock: new Header(),
      ChatItem: new ChatItem(),
      ChatItemTwo: new ChatItem(),
      Button: new Button({
        text: "Отправить",
        onClick: () => {
          getForm("messages-form");
        },
      }),
      InputMessage: new Input({
        type: "text",
        id: "message",
        name: "message",
        placeholder: "Введите сообщение...",
        blur: (event: Event) => {
          validateInput(event.target as HTMLInputElement);
        },
      }),
    });
  }
  override render(): string {
    return `<div class="container center">
                    {{{ HeaderBlock }}}
                    <main class="main">
                        <div class="chat">
                            <div class="chat-list" id="chatList">
                                {{{ChatItem }}}
                                {{{ChatItemTwo }}}
                            </div>
                            <div class="chat-container">
                                <div class="chat-header" id="chatHeader">Выберите чат</div>
                                <div class="chat-messages" id="chatMessages"></div>
                                <form id="messages-form">
                                <div class="chat-input">
                                    {{{ InputMessage}}}
                                    {{{ Button}}} 
                                </div>
                                <form>
                            </div>
                        </div>

                    </main>
                    </div>`;
  }
}
