import { BASE_URL } from "../../constants";
import { SignInRequest, SignUpRequest } from "../../types/Auth";
import { BaseAPI } from "../BaseApi";

class AuthApi extends BaseAPI {
  signup(data: SignUpRequest): Promise<XMLHttpRequest> {
    return this.http.post("/signup", {
      data,
    });
  }
  singin(data: SignInRequest): Promise<XMLHttpRequest> {
    return this.http.post("/signin", { data });
  }
  getUser(): Promise<XMLHttpRequest> {
    return this.http.get("/user");
  }
  logout(): Promise<XMLHttpRequest> {
    return this.http.post("/logout");
  }
}
export default new AuthApi(BASE_URL + "/auth");
