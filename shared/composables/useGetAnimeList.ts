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
      return responseData.list
  }
  catch (error) {
      console.error('Error in animeList:', error);
      return null;
    }
}