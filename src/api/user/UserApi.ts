import { BASE_URL } from "../../constants";
import { IProfile, UserPassword } from "../../types/User";

import { BaseAPI } from "../BaseApi";

class UserApi extends BaseAPI {
  changeProfile(data: IProfile): Promise<XMLHttpRequest> {
    return this.http.put("/profile", { data });
  }
  changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.http.put("/profile/avatar", { data: data });
  }
  changePassword(data: UserPassword): Promise<XMLHttpRequest> {
    return this.http.put("/password", { data });
  }
  searchUser(data: string): Promise<XMLHttpRequest> {
    return this.http.post("/search", { data });
  }
  saveResource(data: FormData): Promise<XMLHttpRequest> {
    return this.http.post("", { data });
  }
}
export default new UserApi(BASE_URL + "/user");
