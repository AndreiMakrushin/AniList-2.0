import type {IUser, TAnime} from "~/shared/types"

export const useAnimeStore = defineStore('anime', () => {
    const user = ref<IUser | null>(null)
    const aniList = ref<TAnime[] | null>(null)
    const page = ref(1)


    return{
        user,
        aniList,
        page
    }
})