import { expect } from 'chai'
import sinon from 'sinon'
import Block from './Block.ts'
import { Route } from './Route.ts'
import { Router } from './Router.ts'

class MockBlock extends Block {
  render() {
    return '<div>Блок</div>'
  }
}

describe('Router', () => {
  let router: Router
  let routeStub: sinon.SinonStubbedInstance<Route>
  let mockBlock: Block

  beforeEach(() => {
    mockBlock = new MockBlock()
    router = new Router('app')

    // @ts-ignore — заглушка, подмена Route
    routeStub = sinon.createStubInstance(Route)
    routeStub.match.returns(true)
    routeStub.render.returns()
    routeStub.leave.returns()

    sinon
      .stub(Route.prototype, 'match')
      .callsFake((path: string) => path === '/test')
    sinon.stub(Route.prototype, 'render').callsFake(() => {})
    sinon.stub(Route.prototype, 'leave').callsFake(() => {})
  })

  afterEach(() => {
    sinon.restore()
  })

  it('метод use()', () => {
    router.use('/test', mockBlock)
    expect(router.routes.length).to.equal(1)
    expect(router.routes[0]).to.be.instanceOf(Route)
  })

  it('метод go()', () => {
    const pushStateSpy = sinon.spy(window.history, 'pushState')

    router.use('/test', mockBlock)
    router.go('/test')

    expect(pushStateSpy.calledWith({}, '', '/test')).to.be.true
  })

  it('переход вперед и назад', () => {
    const backSpy = sinon.spy(window.history, 'back')
    const forwardSpy = sinon.spy(window.history, 'forward')

    router.back()
    router.forward()

    expect(backSpy.calledOnce).to.be.true
    expect(forwardSpy.calledOnce).to.be.true
  })

  it('getRoute возвращает корректный роут', () => {
    router.use('/test', mockBlock)
    const route = router.getRoute('/test')
    expect(route).to.be.instanceOf(Route)
  })
})
