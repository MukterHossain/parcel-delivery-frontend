export interface Root {
  statusCode: number
  success: boolean
  message: string
  data: IUser[]
  meta: Meta
}

export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  role: string
  isDeleted: boolean
  isActive: string
  isVarified: boolean
  auths: Auth[]
  createdAt: string
  updatedAt: string
  picture?: string
}

export interface Auth {
  provider: string
  providerId: string
}

export interface Meta {
  total: number
}