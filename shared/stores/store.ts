import type {IUser, IAnimeCard} from "~/shared/types"

export const useAnimeStore = defineStore('anime', () => {
    const user = ref<IUser | null>(null)
    const aniList = ref<IAnimeCard[] | null>(null)
    const page = ref(1)


    return{
        user,
        aniList,
        page
    }
})