const mapper = new Map<number, boolean>()

export const addUniqueAnime = (e: TAnime[], currentAniList: TAnime[] | null = []) => {
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