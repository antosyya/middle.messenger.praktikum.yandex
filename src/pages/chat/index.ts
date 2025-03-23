import { Button } from "../../components/Button";
import { ChatItem } from "../../components/ChatItem";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import Block from "../../services/Block";
import userController from "../../store/UserController";
import { connect } from "../../services/connect";
import { isEqual } from "../../services/isEqual";
import { router } from "../../services/Router";
import { ROUTES } from "../../services/routersList";
import { getForm, validateInput } from "../../services/validateForm";
import chatController from "../../store/ChatController";
import msgController from "../../store/MsgController";
import store, { StoreEvents } from "../../store/store";
import { IChat } from "../../types/Chats";
import { MsgItem } from "../../components/MsgItem";
import { Message } from "../../types/Message";
export class Chat extends Block {
  constructor() {
    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
    }),
      super({
        showCreateChatForm: false,

        ButtonOpen: new Button({
          text: "+",
          className: "btn-plus",
          onClick: (e: Event) => {
            e.preventDefault();
            this.setProps({ showCreateChatForm: true });
          },
        }),
        ButtonCreateChat: new Button({
          text: "Создать чат",
          onClick: (e: Event) => {
            e.preventDefault();
            const data = getForm("create-chat-form");
            chatController.createChat(data as string);
            this.setProps({ showCreateChatForm: false });
          },
        }),

        InputNameChat: new Input({
          type: "text",
          id: "title",
          name: "title",
          placeholder: "Название чата...",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        Link: new Link({
          text: "Профиль",
          onClick: () => {
            router.go(ROUTES.PROFILE);
          },
        }),
      });
  }
  override componentDidMount(): void {
    chatController.getChats();
  }
  protected override componentDidUpdate(
    oldProps: Record<string, any> | null | undefined,
    newProps: Record<string, any> | null | undefined
  ): boolean {
    const curentUser = store.getState().user;
    const isChangeChats =
      !!newProps?.chats && !isEqual(oldProps?.chats, newProps?.chats);
    const isChangeCurrentChat =
      !!newProps?.currentChat &&
      !isEqual(oldProps?.currentChat, newProps?.currentChat);
    const isChangeMessage =
      !!newProps?.message && !isEqual(oldProps?.message, newProps?.message);
    if (isChangeChats && newProps.chats.length > 0) {
      this.setLists({
        ChatItems: newProps?.chats?.map(
          (chat: IChat) =>
            new ChatItem({
              id: chat.id,
              title: chat.title,
              avatar: chat.avatar ? chat.avatar : "/img/user.svg",
              onClick: () => {
                store.set("currentChat", chat);
                chatController.getToken(chat.id);
                this.setProps({
                  chatTitle: newProps.currentChat.title,
                });
              },
            })
        ),
      });
    }
    if (isChangeMessage && newProps.message.length > 0) {
      this.setLists({
        MessageList: newProps.message.map(
          (msg: Message) =>
            new MsgItem({
              content: msg.content,
              myMsg: msg.user_id === curentUser?.id,
            })
        ),
      });
    }
    if (isChangeCurrentChat) {
      this.setChildren({
        InputDeleteUser: new Input({
          id: "delete-login",
          name: "login",
          type: "login",
          placeholder: "Логин пользователя...",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        InputAddUser: new Input({
          id: "add-login",
          name: "login",
          type: "login",
          placeholder: "Логин пользователя...",
          blur: (event: Event) => {
            validateInput(event.target as HTMLInputElement);
          },
        }),
        ButtonDeleteUser: new Button({
          text: "Удалить пользователя",
          onClick: async (e: Event) => {
            e.preventDefault();
            const data = getForm("delete-user");
            const users = await userController.searchUser(data as string);
            const chatId = store.getState().currentChat?.id;
            if (users && users?.length > 0 && chatId) {
              chatController.deleteUsers({
                chatId: chatId,
                users: [users[0].id],
              });
            }

            this.setProps({ showCreateChatForm: false });
          },
        }),
        ButtonAddUser: new Button({
          text: "Добавить пользователя",
          onClick: async (e: Event) => {
            e.preventDefault();
            const data = getForm("add-user");
            const users = await userController.searchUser(data as string);
            const chatId = store.getState().currentChat?.id;
            if (users && users?.length > 0 && chatId) {
              chatController.addUsers({ chatId: chatId, users: [users[0].id] });
            }
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
        Button: new Button({
          text: "Отправить",
          onClick: (e: Event) => {
            e.preventDefault();
            const data = getForm<{ message: string }>("messages-form");
            if (data.message) {
              msgController.sendMessage(data.message as string);
            }
          },
        }),
      });
    }
    return true;
  }
  override render(): string {
    return `<div class="container center">
                    <main class="main">
                        <div class="chat">
                            <div class="chat-list" id="chatList">
                            <div class="row-chat">
                              {{{ButtonOpen}}}
                              {{{Link}}}
                            </div>
                            {{#if showCreateChatForm }}
                            <div>
                            <form id="create-chat-form">
                              {{{InputNameChat}}}
                              <span class="error"></span>
                              {{{ButtonCreateChat}}}
                               <form>
                            </div>
                            {{/if}}
                                {{{ChatItems}}}
                            </div>
                            <div class="chat-container">
                                <div class="chat-header" id="chatHeader">{{chatTitle}}</div>
                                <div class="chat-header row" > 
                                  <form id="delete-user">
                                    <div >
                                        {{{InputDeleteUser}}}
                                        <span class="error"></span>
                                        {{{ ButtonDeleteUser}}} 
                                    </div>
                                  </form> 
                                  <form id="add-user">
                                    <div >
                                        {{{ InputAddUser}}}
                                         <span class="error"></span>
                                        {{{  ButtonAddUser}}} 
                                    </div>
                                  </form>
                                </div>
                                <div class="chat-messages" id="chatMessages">{{{MessageList}}}</div>
                                <form class="chat-input-wrap"  id="messages-form">
                                <div class="chat-input" >
                                    {{{ InputMessage}}}
                                     <span class="error"></span>
                                     </div>
                                    {{{ Button}}} 
                                <form>
                            </div>
                        </div>
                    </main>
                    </div>`;
  }
}
const ChatPage = connect((state) => ({ user: state.user }))(Chat);

export default ChatPage;
