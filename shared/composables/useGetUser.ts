import type { User } from '@supabase/supabase-js'

interface DatabaseUser {
  id: string
  email: string
  // добавьте другие поля по необходимости
}

type UserResponse = 
  | { data: DatabaseUser; error: null }
  | { data: null; error: { message: string } }

export const useGetUser = (): Promise<UserResponse> => {
  const { $supabase } = useNuxtApp()
  
  return new Promise(async (resolve) => {
    try {
      // 1. Проверка сессии
      const { data: sessionData, error: sessionError } = await $supabase.auth.getSession()
      
      if (sessionError || !sessionData.session) {
        return resolve({ 
          data: null, 
          error: { message: 'Не авторизован' } 
        })
      }

      // 2. Получение текущего пользователя
      const { data: userData, error: userError } = await $supabase.auth.getUser()
      
      if (userError || !userData.user) {
        return resolve({
          data: null,
          error: { message: userError?.message || 'Пользователь не найден' }
        })
      }

      // 3. Получение доп. данных из таблицы users
      const { data: dbUser, error: dbError } = await $supabase
        .from('users')
        .select('id, email') // явно указываем нужные поля
        .eq('email', userData.user.email)
        .single()

      if (dbError || !dbUser) {
        return resolve({
          data: null,
          error: { message: dbError?.message || 'Данные пользователя не найдены' }
        })
      }

      // 4. Успешный результат
      resolve({
        data: dbUser,
        error: null
      })

    } catch (err) {
      resolve({
        data: null,
        error: { 
          message: err instanceof Error ? err.message : 'Неизвестная ошибка'
        }
      })
    }
  })
}