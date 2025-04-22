import { BaseAPI } from '../BaseApi'
import { BASE_URL } from '../../constants'
import { UsersToChat } from '../../types/Chats'

class ChatApi extends BaseAPI {
  public getChats(
    offset: number = 0,
    limit: number = 100,
    title: string = ''
  ): Promise<XMLHttpRequest> {
    return this.http.get('', { data: { offset, limit, title } })
  }

  public createChat(data: string): Promise<XMLHttpRequest> {
    console.log(data)
    return this.http.post('', { data })
  }

  public deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return this.http.delete('', { data: { chatId } })
  }

  public addUsers(data: UsersToChat): Promise<XMLHttpRequest> {
    return this.http.put('/users', { data })
  }

  public deleteUsers(data: UsersToChat): Promise<XMLHttpRequest> {
    return this.http.delete('/users', { data })
  }

  public setChatAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.http.put('/avatar', { data })
  }

  public getChatUsers(chatID: number): Promise<XMLHttpRequest> {
    return this.http.get(`/${chatID}/users`, {})
  }

  public getToken(chatID: number): Promise<XMLHttpRequest> {
    return this.http.post(`/token/${chatID}`, {})
  }
}
export default new ChatApi(BASE_URL + '/chats')
