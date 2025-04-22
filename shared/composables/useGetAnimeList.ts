import type { TAnime, IAnimeCard} from "~/shared/types";

export const useGetAnimeList = async(page: number) =>{
    const config = useRuntimeConfig()
    const list = config.public.ANIME_LIST

    try {
      const response = await fetch(`${list}${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
        throw new Error('No anime data found in response');
      }
      
      return responseData.list.map((item: TAnime): IAnimeCard => ({
          id: item.id,
          code: item.code,
          names: item.names,
          poster: item.posters.original.url ?? item.posters.medium.url ?? item.posters.small.url,
          description: item.description,
          season: item.season
      })) ?? []
  }
  catch (error) {
      console.error('Error in animeList:', error);
      return null;
    }
}