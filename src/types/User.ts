export interface UserBase {
  first_name: string
  second_name: string
  avatar: string
  email: string
  login: string
  phone: string
}
export interface User extends UserBase {
  id: number
  display_name: string
}
export interface IProfile {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
export interface UserPassword {
  oldPassword: string
  newPassword: string
}
