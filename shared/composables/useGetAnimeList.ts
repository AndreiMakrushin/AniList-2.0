import type { TAnime, IAnimeCard} from "~/shared/types";

export const useGetAnimeList = async(page: number) =>{
    const config = useRuntimeConfig()
    const list = config.public.ANIME_LIST

    const api = config.public.ANILIBRIA_API

    try {
      const response = await fetch(`${api}${list}?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
        throw new Error('No anime data found in response');
      }
      
      return responseData.data?.map((item: TAnime): IAnimeCard => ({
        id: item.id,
        code: item.alias || '',
        name: item.name || '',
        poster: `${item.poster?.preview}` || '',
        description: item.description ?? '',
        season: item.season ?? '',
        year: item.year ?? 0
      })) ?? []
  }
  catch (error) {
      console.error('Error in animeList:', error);
      return null;
    }
}