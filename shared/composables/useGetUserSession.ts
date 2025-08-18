import type { IUser, TUserResponse } from '~/shared/types'
import { useSupabaseAuth } from './useSupabaseAuth'

export const useGetUserSession = async (): Promise<TUserResponse<IUser>> => {

  const { getSession, getUser, getUserFromTable } = useSupabaseAuth()

  try {
    const { data: session, error: sessionError } = await getSession()
    
    if (sessionError || !session?.session) {
      return {
        data: null,
        error: { 
          message: sessionError?.message || 'Требуется авторизация'
        }
      }
    }
    const { data: authData, error: authError } = await getUser()
    
    if (authError || !authData.user) {
      return {
        data: null,
        error: {
          message: authError?.message || 'Пользователь не найден'
        }
      }
    }
    const { data: dbUser, error: dbError } = await getUserFromTable(authData.user.email!)

    if (dbError || !dbUser) {
      return {
        data: null,
        error: {
          message: dbError?.message || 'Данные пользователя не найдены'
        }
      }
    }
    return {
      data: dbUser as IUser,
      error: null
    }

  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      }
    }
  }
}