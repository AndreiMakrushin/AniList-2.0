
export const useSupabaseAnime = () => {
    const {$supabase} = useNuxtApp()

    return {
       
         addAnimeToHistory: async (user: string, videoElement: HTMLVideoElement, animeId: number, animeName: string, animePoster: string, episodeAnime: number) => {
            try {
                const {data: existsAnime} = await $supabase
                    .from('animeUserList')
                    .select()
                    .filter("animeId", "eq", animeId)
                    .filter("episode", "eq", episodeAnime)
                    .filter("userId", "eq", user)
                    .single()
                
                if (videoElement && existsAnime) {
                    videoElement.currentTime = existsAnime.current_Time
                    return
                }
                
                const animeToHistory = {
                    animeId,
                    userId: user,
                    current_Time: videoElement.currentTime,
                    duration_Time: Math.floor(videoElement.duration || 0),
                    nameAnime: animeName,
                    img: animePoster ? `https://dl-20211030-963.anilib.top${animePoster}` : null,
                    episode: episodeAnime
                }
                
                
                try {
                    await $supabase.from('animeUserList').insert(animeToHistory)
                } catch(error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}