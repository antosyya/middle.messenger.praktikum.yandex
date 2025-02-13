import { AuthPage } from "./pages/auth/index.ts";
import { ChatPage } from "./pages/chat/index.ts";
import { ErrorPage } from "./pages/error/index.ts";
import { NotFound } from "./pages/not-found/index.ts";
import { Profile } from "./pages/profile/index.ts";
import { Register } from "./pages/register/index.ts";
export default class App {
  appElement: HTMLElement;

  constructor() {
    const appElement: HTMLElement | null = document.getElementById(
      "app"
    ) as HTMLElement;
    if (!appElement) {
      throw Error("Нет div");
    }
    this.appElement = appElement;
  }

  render(): string {
    const path = window.location.pathname;
    if (window.location.pathname === "/") {
      const authPage = new AuthPage();
      this.appElement?.appendChild(authPage.getContent());
      authPage.dispatchComponentDidMount();
      return "";
    }
    if (path.includes("login")) {
      const authPage = new AuthPage();
      this.appElement?.appendChild(authPage.getContent());
      authPage.dispatchComponentDidMount();
      return "";
    }

    if (path.includes("register")) {
      const register = new Register();
      this.appElement?.appendChild(register.getContent());
      register.dispatchComponentDidMount();
      return "";
    }
    if (path.includes("profile")) {
      const profile = new Profile();
      this.appElement?.appendChild(profile.getContent());
      profile.dispatchComponentDidMount();
      return "";
    }
    if (path.includes("not-found")) {
      const notFound = new NotFound();
      this.appElement?.appendChild(notFound.getContent());
      notFound.dispatchComponentDidMount();
      return "";
    }
    if (path.includes("error")) {
      const errorPage = new ErrorPage();
      this.appElement?.appendChild(errorPage.getContent());
      errorPage.dispatchComponentDidMount();
      return "";
    }
    if (path.includes("chat")) {
      const chatPage = new ChatPage();
      this.appElement?.appendChild(chatPage.getContent());
      chatPage.dispatchComponentDidMount();
      return "";
    }
    return "";
  }
}
