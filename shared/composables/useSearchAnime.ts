import type { TAnime } from '~/shared/types'

export const useSearchAnime = async (searchAnime: string): Promise<TAnime[] | null> => {
  const config = useRuntimeConfig()
  const API_search = config.public.ANIME_SEARCH
  const api = config.public.ANILIBRIA_API

  try {
    const response = await fetch(`${api}${API_search}${searchAnime}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
      throw new Error('No anime data found in response');
    }

    return responseData
  } catch (error) {
    console.error('Error in animeSearch:', error);
    return null;
  }
}