import type { IUser, IRegisterForm } from '~/shared/types'
import { useSupabaseAuth } from './useSupabaseAuth'

type TRegisterResponse<T> = 
  | { data: T; error: null }
  | { data: null; error: { message: string } }
  
  
  export const useRegister = async (credentials: IRegisterForm): Promise<TRegisterResponse<IUser>> => {
    const  {signUp, getUserFromTable, insertUser}  = useSupabaseAuth()
    
      const { name, email, password } = credentials

      const { data: existingUser } = await getUserFromTable(email)
  
      if (existingUser) {
        return {
          data: null,
          error: { message: 'Пользователь с таким email уже существует' }
        }
      }

      const { error: authError } = await signUp(
        email,
        password
      )
  
      if (authError) {
        return {
          data: null,
          error: { message: authError.message || 'Ошибка регистрации' }
        }
      }

      const { error: insertError } = await insertUser(name, email)
  
      if (insertError) {
        return {
          data: null,
          error: { message: insertError.message || 'Ошибка создания пользователя' }
        }
      }
  
      
      const { data: newUser, error: fetchError } = await getUserFromTable(email)
  
      if (fetchError || !newUser) {
        return {
          data: null,
          error: { message: fetchError?.message || 'Пользователь не найден' }
        }
      }
  
      return {
        data: newUser,
        error: null
      }
    }
  