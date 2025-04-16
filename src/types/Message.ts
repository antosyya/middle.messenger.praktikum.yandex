export interface MessageFile {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}

export interface Message {
  id: number
  is_read: boolean
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: MessageFile
}
