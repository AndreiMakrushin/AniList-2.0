export const useGetUser = async () => {
    const { $supabase } = useNuxtApp()
    
    
    const unauthorized = await $supabase.auth.getSession()
    if (unauthorized.data.session === null) return

    const { data, error } = await $supabase.auth.getUser()

    if (!data.user) return

    const { data: userWithEmail } = await $supabase
      .from('users')
      .select()
      .eq('email', data.user.email)
      .single()

    return userWithEmail
}