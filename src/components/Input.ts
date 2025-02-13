import Block from "../services/Block";

// export default `<input placeholder="{{placeholder}}" type="{{type}}" id="{{id}}" name="{{name}}" class="input"/>`;
interface Props {
  placeholder?: string;
  type: string;
  id: number | string;
  name: string;
  className?: string;
  blur?: (event: Event) => void;
}
export class Input extends Block {
  constructor(props: Props) {
    super({ ...props, events: { blur: props.blur } });
  }
  override render(): string {
    return `<input placeholder="{{placeholder}}" type="{{type}}" id="{{id}}" name="{{name}}" class={{className}} />`;
  }
}
