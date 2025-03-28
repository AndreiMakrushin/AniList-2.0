import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      global: {
        fetch: (input, init) => {
          return fetch(input, init).catch(() => {
            return new Response(JSON.stringify({
              error: { message: 'Network error' }
            }), { status: 500 })
          })
        }
      },
      
      auth: {
        detectSessionInUrl: false,
        autoRefreshToken: false
      }
    }
  )

  return {
    provide: {
      supabase
    }
  }
})