import Block from "../services/Block";

interface Props {
  text: string;
  onClick?: (event: Event) => void;
  className?: string;
}
export class Button extends Block {
  constructor({ className = "button", ...props }: Props) {
    super({
      ...props,
      className,
      events: {
        click: props.onClick,
      },
    });
  }
  override render() {
    return `<button class={{className}} type="submit">{{text}}</button>`;
  }
}
