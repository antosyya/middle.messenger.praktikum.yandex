import chatApi from "../api/chat/ChatApi";
import { UsersToChat } from "../types/Chats";
import { User } from "../types/User";
import MsgController from "./MsgController";
import store from "./store";
class ChatController {
  async getChats(offset: number = 0, limit: number = 100, title: string = "") {
    try {
      const responce = await chatApi.getChats(offset, limit, title);
      if (responce.status === 200) {
        store.set(
          "chats",
          JSON.parse(responce?.response)?.map((item: any) => ({ ...item }))
        );
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async createChat(data: string) {
    try {
      const responce = await chatApi.createChat(data);
      if (responce.status === 200) {
        this.getChats();
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async deleteChat(chatId: number) {
    try {
      const responce = await chatApi.deleteChat(chatId);
      if (responce.status === 200) {
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async addUsers(data: UsersToChat) {
    try {
      const responce = await chatApi.addUsers(data);
      if (responce.status === 200) {
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async deleteUsers(data: UsersToChat) {
    try {
      const responce = await chatApi.deleteUsers(data);
      if (responce.status === 200) {
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async setChatAvatar(data: FormData) {
    try {
      const responce = await chatApi.setChatAvatar(data);
      if (responce.status === 200) {
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getChatUsers(chatID: number) {
    try {
      const responce = await chatApi.getChatUsers(chatID);
      if (responce.status === 200) {
        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getToken(chatID: number) {
    try {
      const responce = await chatApi.getToken(chatID);
      if (responce.status === 200) {
        const user: User | undefined = store.getState().user;
        const token = JSON.parse(responce.response);
        if (user && responce.response) {
          await MsgController.connect(`/${user.id}/${chatID}/${token.token}`);
        }

        return responce.response;
      } else if (responce.status !== 200) {
        throw new Error(responce.responseText);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
export default new ChatController();
