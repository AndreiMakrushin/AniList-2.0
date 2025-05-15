export const useSupabaseAuth = () => {
    const { $supabase } = useNuxtApp()
   
    return{
        signUp: async (email: string, password: string) => {
            const { data, error } = await $supabase.auth.signUp({
                email,
                password
            })
            return { data, error }
        },

        signIn: async (email: string, password: string) => {
            const { data, error } = await $supabase.auth.signInWithPassword({
                email,
                password
            })
            return { data, error }
        },

        getUserFromTable: async (email: string) => {
            const { data, error  } = await $supabase
            .from('users')
            .select<string, IUser>()
            .eq('email', email)
            .single()
            return { data, error }
        },              

        insertUser: async (name: string, email: string) => {
            const { error: insertError } = await $supabase
            .from('users')
            .insert({ name, email })
            return { error: insertError }
        }, 
        
        getSession: async () => {
            const { data, error } = await $supabase.auth.getSession()
            return { data, error }
        },

        getUser: async () => {
            const { data, error } = await $supabase.auth.getUser()
            return { data, error }
        },

        deleteUserAvatar: async (id: string) =>{
            const { error } = await $supabase
            .from('users')
            .update({ avatar_url: null })
            .eq('id', id)
            return { error }
        }
}
}