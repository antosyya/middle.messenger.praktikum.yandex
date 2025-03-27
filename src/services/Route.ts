import Block from "./Block";
import { isEqualString } from "./isEqualString";

export class Route {
  private _block: Block | null = null;
  private _pathname: string;
  private _blockClass: Block;
  private _props: { rootQuery: string };
  constructor(pathname: string, view: Block, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqualString(pathname, this._pathname);
  }
  setContent<T extends Block>(query: string, block: T) {
    const root: HTMLElement | null = document.getElementById(query);

    const element = block.getContent();
    if (root && element) root.replaceChildren(element);

    block.dispatchComponentDidMount();

    return root;
  }
  render(): void {
    this._block = this._blockClass;
    this.setContent(this._props.rootQuery, this._block);
  }
}
