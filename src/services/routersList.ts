import { AuthPage } from "../pages/auth";
import ChatPage from "../pages/chat";
import { NotFound } from "../pages/not-found";
import Profile from "../pages/profile";
import { Register } from "../pages/register";
import { IRoute } from "./types";
export enum ROUTES {
  LOGIN = "/",
  SIGNUP = "/sign-up",
  PROFILE = "/settings",
  CHATS = "/messenger",
}
export const routes: Array<IRoute> = [
  { path: ROUTES.LOGIN, component: AuthPage },
  { path: ROUTES.SIGNUP, component: Register },
  { path: ROUTES.PROFILE, component: Profile },
  { path: ROUTES.CHATS, component: ChatPage },
  { path: "*", component: NotFound },
];
