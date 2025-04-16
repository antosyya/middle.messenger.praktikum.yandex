import Block from '../services/Block'
interface Props {
  avatar?: string
}
export class Avatar extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }
  protected override render(): string {
    return ` <div class="avatar-wrap"><img src={{avatar}} alt="аватар"></div>`
  }
}
