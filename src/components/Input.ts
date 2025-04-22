import Block from '../services/Block'

interface Props {
  placeholder?: string
  type: string
  id: number | string
  value?: string
  name: string
  className?: string
  blur?: (event: Event) => void
  change?: (event: Event) => void
}
export class Input extends Block {
  constructor(props: Props) {
    super({ ...props, events: { blur: props.blur, change: props.change } })
  }
  override render(): string {
    return `<input placeholder="{{placeholder}}" value="{{value}}" type="{{type}}" id="{{id}}" name="{{name}}" class={{className}} />`
  }
}
