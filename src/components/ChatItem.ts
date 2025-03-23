import Block from "../services/Block";
interface Props {
  id: number;
  title: string;
  avatar?: string;
  onClick: () => void;
}
export class ChatItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  protected override render(): string {
    return `<div class="chat-list-item" >
              <div class="chat-list-item-text" >   
                <div class="avatar-wrap avatar-wrap-chat"><img src={{avatar}} alt="Avatar"></div>
                {{title}}
                </div>
            </div>`;
  }
}
