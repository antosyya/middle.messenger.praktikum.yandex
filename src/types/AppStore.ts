import { Chats, IChat } from './Chats'
import { Message } from './Message'
import { User } from './User'

export interface AppStore {
  user: User
  chats: Chats
  currentChat: IChat
  message: Message[]
}
