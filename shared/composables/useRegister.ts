import type { IUser, IRegisterForm } from '@/shared/types/types'

type TRegisterResponse<T> = {
    data: T | null
    error: { message: string } | null
  }
  
  export const useRegister = () => {
    const { $supabase } = useNuxtApp()
  
    const registerUser = async (
      credentials: IRegisterForm
    ): Promise<TRegisterResponse<IUser>> => {
      const { name, email, password } = credentials

      const { data: existingUser } = await $supabase
        .from('users')
        .select()
        .eq('email', email)
        .single()
  
      if (existingUser) {
        return {
          data: null,
          error: { message: 'Пользователь с таким email уже существует' }
        }
      }
  

      const { error: authError } = await $supabase.auth.signUp({
        email,
        password
      })
  
      if (authError) {
        return {
          data: null,
          error: { message: authError.message || 'Ошибка регистрации' }
        }
      }
  

      const { error: insertError } = await $supabase
        .from('users')
        .insert({ name, email })
  
      if (insertError) {
        return {
          data: null,
          error: { message: insertError.message || 'Ошибка создания пользователя' }
        }
      }
  
      
      const { data: newUser, error: fetchError } = await $supabase
        .from('users')
        .select<string, IUser>()
        .eq('email', email)
        .single()
  
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
  
    return { registerUser }
  }