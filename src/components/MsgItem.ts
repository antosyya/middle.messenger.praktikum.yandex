import Block from '../services/Block'
interface Props {
  content: string | null
  myMsg: boolean
}
export class MsgItem extends Block {
  constructor(props: Props) {
    super({
      ...props
    })
  }
  protected override render(): string {
    return `<div class="chat-list-item {{#if myMsg}}my-message-text{{/if}}" >
                {{content}}
            </div>`
  }
}
