import Block from "../services/Block";

interface Props {
  text: string;
  onClick?: (event: Event) => void;
}
export class Link extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  override render() {
    return `<span class="link" >{{text}}</span>`;
  }
}
