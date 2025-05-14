import type { IAddAnime } from "~/shared/types";
import {realTimeUpdate} from "@/shared/helpers/realTimeUpdate";
export const useSupabaseAnime = () => {
    const {$supabase} = useNuxtApp()

    return {
       
         addAnimeToHistory: async (user: string, videoElement: HTMLVideoElement, animeId: number, animeName: string, animePoster: string, episodeAnime: number, code: string) => {
            try {
                const {data: existsAnime} = await $supabase
                    .from('animeUserList')
                    .select()
                    .filter("animeId", "eq", animeId)
                    .filter("episode", "eq", episodeAnime)
                    .filter("userId", "eq", user)
                    .single()
                
                
                
                const animeToHistory = {
                    animeId,
                    userId: user,
                    current_Time: videoElement.currentTime,
                    duration_Time: Math.floor(videoElement.duration || 0),
                    nameAnime: animeName,
                    img: animePoster ? animePoster : null,
                    episode: episodeAnime,
                    updated: realTimeUpdate(),
                    code: code
                }
                
                
                try {
                    if(existsAnime) return
                    console.log(animeToHistory);
                    
                    await $supabase.from('animeUserList').insert(animeToHistory)
                } catch(error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        },

        getAnimeToHistory: async (user: string): Promise<IAddAnime[]> => {
            try {
                const { data } = await $supabase
                    .from('animeUserList')
                    .select()
                    .filter("userId", "eq", user);
                return data ?? [];
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    }
}