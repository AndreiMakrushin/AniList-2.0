export interface IUser {
    id: string
    email: string
    created_at: string
    name: string
    avatar_url: string
  }

 export interface IRegisterForm {
    name: string
    email: string
    password: string
  }