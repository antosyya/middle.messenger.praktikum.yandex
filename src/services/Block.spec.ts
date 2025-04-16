import { expect } from 'chai'
import Block from './Block.ts'

describe('Block', () => {
  class TestBlock extends Block {
    render(): string {
      return `<div class="test">{{text}}</div>`
    }
  }

  it('должен создать элемент и отрендерить разметку', () => {
    const block = new TestBlock({ text: 'Hello' })
    const content = block.getContent()
    expect(content.outerHTML).to.contain('Hello')
    expect(content.classList.contains('test')).to.be.true
  })

  it('должен обновлять props и вызывать componentDidUpdate', () => {
    const block = new TestBlock({ text: 'before' })
    let called = false

    ;(block as any).componentDidUpdate = function (
      oldProps: any,
      newProps: any
    ) {
      called = true
      expect(oldProps.text).to.equal('before')
      expect(newProps.text).to.equal('after')
      return true
    }

    block.setProps({ text: 'after' })
    expect(called).to.be.true
  })

  it('должен правильно скрывать и показывать компонент', () => {
    const block = new TestBlock({ text: 'Visible' })
    const content = block.getContent()

    block.hide()
    expect(content.style.display).to.equal('none')

    block.show()
    expect(content.style.display).to.equal('flex')
  })
})
