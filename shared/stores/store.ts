import type {IUser} from "~/shared/types"
export const useAnimeStore = defineStore('anime', () => {
    const user = ref<IUser | null>(null)


    return{
        user
    }
})