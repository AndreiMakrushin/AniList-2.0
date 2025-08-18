import type { IAddAnime, IAnimeStatus, IAddAnimeToHistory, IRealTimeUpdate, IAnimeHistoryRecord } from "~/shared/types";
import {realTimeUpdate} from "@/shared/helpers/realTimeUpdate";
export const useSupabaseAnime = () => {
    const {$supabase} = useNuxtApp()

    return {
       
      addAnimeToHistory: async (payload: IAddAnimeToHistory, userId: string): Promise<IAnimeHistoryRecord> => {
        try {
          const { data: existsAnime } = await $supabase
            .from('animeUserList')
            .select()
            .eq("animeId", payload.animeId)
            .eq("episode", payload.episodeAnime)
            .eq("userId", userId)
            .single();
      
          const animeToHistory = {
            animeId: payload.animeId,
            userId: userId,
            current_Time: payload.videoElement?.currentTime,
            duration_Time: Math.floor(payload.videoElement?.duration ?? 0),
            nameAnime: payload.animeName,
            img: payload.animePoster ?? null,
            episode: payload.episodeAnime,
            updated: realTimeUpdate(),
            code: payload.code
          };
      
          if (!existsAnime) {
            await $supabase.from('animeUserList').insert(animeToHistory);
          }
      
          return {
            currentTime: existsAnime.current_Time,
            episode: existsAnime.episode
          };
      
        } catch (error) {
          console.error('Error in addAnimeToHistory:', error);
          return {
            currentTime: 0,
            episode: 1
          };
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
        getAnimeToStatus: async(status: string, userId: string): Promise<IAnimeStatus[]> => {
            try {
                const { data } = await $supabase
                    .from('animeStatusList')
                    .select()
                    .filter("statusId", "eq", status)
                    .filter("userId", "eq", userId);

                return data ?? [];
            } catch (error) {
                console.log(error);
                return [];
            }
        },
        getStatusAnime: async (animeId: number): Promise<string> => {
          try {
            const { data } = await $supabase
              .from('animeStatusList')
              .select('statusId')
              .eq('animeId', animeId)
              .single();
            return data?.statusId ?? '';
          } catch (error) {
            console.log(error);
            return '';
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
                    code: anime.code,
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
          },
          updateAnimeHistory: async (update: IRealTimeUpdate, userId: string) => {
            try {
              
              const { data: existingRecord, error: findError } = await $supabase
                .from('animeUserList')
                .select()
                .eq('animeId', update.animeId)
                .eq('episode', update.episodeAnime)
                .eq('userId', userId)
                .maybeSingle();
          
              if (findError) throw findError;
              
              
              if (!existingRecord) {
                console.error(`Anime not found for user ${userId}, anime ${update.animeId}, episode ${update.episodeAnime}`);
                return null; 
              }
          
              
              const { error: updateError } = await $supabase
                .from('animeUserList')
                .update({
                  current_Time: update.timer,
                  updated: update.realTimeUpdate,
                  
                })
                .eq('id', existingRecord.id); 
          
              if (updateError) throw updateError;
          
              return { success: true };
          
            } catch (error) {
              console.error('Failed to update anime history:', error);
              throw error;
            }
          }
    }
}