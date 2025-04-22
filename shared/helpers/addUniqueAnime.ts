const mapper = new Map<number, boolean>()

export const addUniqueAnime = (e: IAnimeCard[], currentAniList: IAnimeCard[] | null = []) => {
  if (!e) return currentAniList
   const uniqueAnime = e.filter((anime)=> {
    if (!mapper.has(anime.id)) {
      mapper.set(anime.id, true)
      return true
    }
    return false
   }
   )
   return [...currentAniList ?? [], ...uniqueAnime]
  
}