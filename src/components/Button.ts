import Block from "../services/Block";

// export default `<button class="button" type="submit">{{text}}</button>`;
interface Props {
  text: string;
  onClick?: (event: Event) => void;
}
export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  override render() {
    return `<button class="button" type="submit">{{text}}</button>`;
  }
}
