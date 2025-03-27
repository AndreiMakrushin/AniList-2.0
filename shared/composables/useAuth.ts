import type {IUser} from '@/shared/types/types'
type TAuthResponse<T = unknown> = 
  | { data: T; error: null }
  | { data: null; error: { message: string } }

export const useAuth = (): {
  login: (
    email: string, 
    password: string
  ) => Promise<TAuthResponse<IUser>>
} => {
  const { $supabase } = useNuxtApp()
  
  const login = async (
    email: string, 
    password: string
  ): Promise<TAuthResponse<IUser>> => {
    if (!email || !password) {
      return { 
        data: null, 
        error: { message: 'Почта и пароль обязательны' } 
      }
    }
    
    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { data: null, error }
      }

      if (!data.user) {
        return { 
          data: null, 
          error: { message: 'Неверные почта или пароль' } 
        }
      }

      const { data: user, error: queryError } = await $supabase
        .from('users')
        .select<string, IUser>()
        .eq('email', email)
        .single()

      if (queryError) {
        return { data: null, error: queryError }
      }

      return { data: user, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: { 
          message: err instanceof Error ? err.message : 'Неверные почта или пароль'
        } 
      }
    }
  }

  return { login }
}