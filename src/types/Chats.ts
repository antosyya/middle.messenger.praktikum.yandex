import { User } from "./User";

export type Chats = IChat[];

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage;
}

export interface LastMessage {
  user: User;
  time: string;
  content: string;
}
export interface UsersToChat {
  users: number[];
  chatId: number;
}
