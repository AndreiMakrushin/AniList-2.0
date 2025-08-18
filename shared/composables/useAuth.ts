import type {IUser, TUserResponse, ILoginForm} from '~/shared/types'
import { useSupabaseAuth } from './useSupabaseAuth'

export const useAuth = async (credentials: ILoginForm): Promise<TUserResponse<IUser>> => {

  const { signIn, getUserFromTable } = useSupabaseAuth()

  const { email, password } = credentials
  
  
    if (!email || !password) {
      return { 
        data: null, 
        error: { message: 'Почта и пароль обязательны' } 
      }
    }
    
    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        return { data: null, error }
      }

      if (!data.user) {
        return { 
          data: null, 
          error: { message: 'Неверные почта или пароль' } 
        }
      }

      const { data: user, error: queryError } = await getUserFromTable(email)

      if (queryError) {
        return { data: null, error: queryError }
      }

      return { data: user as IUser, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: { 
          message: err instanceof Error ? err.message : 'Неверные почта или пароль'
        } 
      }
    }
  }

  
