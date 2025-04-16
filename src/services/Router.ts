import Block from './Block'
import { Route } from './Route.ts'

export class Router {
  private _rootQuery!: string
  public routes: Route[] = []
  private static __instance: Router
  private _currentRoute: Route | null = null
  public readonly history: History = window.history
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route as Route
    route?.render()
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    window.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }
}
export const router = new Router('app')
