import { SignInRequest, SignUpRequest } from "../types/Auth";
import authApi from "../api/auth/AuthApi";
import { router } from "../services/Router";
import { ROUTES } from "../services/routersList";
import store from "./store";
class AuthController {
  async signup(data: SignUpRequest) {
    try {
      const responce = await authApi.signup({
        first_name: data.first_name,
        second_name: data.second_name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        login: data.login,
      });
      if (responce.status === 200) {
        this.getUser();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async singin(data: SignInRequest) {
    try {
      const responce = await authApi.singin(data);
      if (responce.status === 200) {
        this.getUser();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getUser() {
    try {
      const responce = await authApi.getUser();
      if (responce.status === 200) {
        const user = JSON.parse(responce.response);
        store.set("user", { ...user, avatar: user?.avatar });
        const isAuthPage = ["/", "/sign-up"].includes(location.pathname);
        if (isAuthPage) {
          router.go(ROUTES.CHATS);
        }
        return responce.response;
      }
    } catch (e) {
      const isAuthPage = ["/", "/sign-up"].includes(location.pathname);
      if (!isAuthPage) {
        router.go(ROUTES.LOGIN);
      }
      console.log(e);
    }
  }
  async logout() {
    try {
      const responce = await authApi.logout();
      if (responce.status === 200) {
        router.go(ROUTES.LOGIN);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
export default new AuthController();
