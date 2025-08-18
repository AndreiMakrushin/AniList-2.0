import { useAnimeStore } from "@/shared/stores/store";
import { useGetUserSession } from "@/shared/composables/useGetUserSession";


export const useGetUser = async () => {
    const store = useAnimeStore()
    const result = await useGetUserSession()
    if (result.error) {
        store.user = null
    } else {
        store.user = result.data
    }
}