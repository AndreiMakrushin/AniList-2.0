import type { IAddAnime, IAnimeStatus } from "~/shared/types";
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
        },
        getAnimeToStatus: async(status: string): Promise<IAnimeStatus[]> => {
            try {
                const { data } = await $supabase
                    .from('animeStatusList')
                    .select()
                    .filter("statusId", "eq", status);
                return data ?? [];
            } catch (error) {
                console.log(error);
                return [];
            }
        },
        addAnimeToStatus: async (userId: string, anime: IAnimeStatus) => {
            try {
              const { data: existingRecord, error: selectError } = await $supabase
                .from('animeStatusList')
                .select()
                .eq("userId", userId)
                .eq("animeId", anime.animeId)
                .maybeSingle();
          
              if (selectError) throw selectError;
          
              if (!existingRecord) {
                const { error: insertError } = await $supabase
                  .from('animeStatusList')
                  .insert({
                    userId: userId,
                    img: anime.img,
                    nameAnime: anime.nameAnime,
                    animeId: anime.animeId,
                    statusId: anime.statusId,
                    statusRu: anime.statusRu,
                    statusEn: anime.statusEn,
                  });
                
                if (insertError) throw insertError;
                return { success: true, operation: 'insert' };
              }
              
              const { error: updateError } = await $supabase
                .from('animeStatusList')
                .update({
                  statusId: anime.statusId,
                  statusRu: anime.statusRu,
                  statusEn: anime.statusEn,
                  img: anime.img,
                  nameAnime: anime.nameAnime
                })
                .eq("userId", userId)
                .eq("animeId", anime.animeId);
          
              if (updateError) throw updateError;
              return { success: true, operation: 'update' };
          
            } catch (error) {
              console.error('Error in addAnimeToStatus:', error);
              return { 
                success: false, 
                error: error instanceof Error ? error.message : String(error)
              };
            }
          }
    }
}