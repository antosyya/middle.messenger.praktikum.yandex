import { router } from "./services/Router.ts";
import { routes } from "./services/routersList.ts";
import { IRoute } from "./services/types.ts";
import authController from "./store/AuthController.ts";
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

  async render(): Promise<void> {
    routes.map((item: IRoute) => router.use(item.path, new item.component()));
    router.start();
    await authController.getUser();
  }
}
