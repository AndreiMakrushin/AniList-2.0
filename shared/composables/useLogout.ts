export const useLogout = async () => {
    const { $supabase } = useNuxtApp()
    const { error } = await $supabase.auth.signOut()
    return { error }
}