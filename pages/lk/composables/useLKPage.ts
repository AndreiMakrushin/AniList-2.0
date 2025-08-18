import { useSupabaseAuth } from "~/shared/composables/useSupabaseAuth";
import { useSupabaseAnime } from "~/shared/composables/useSupabaseAnime";
import type { IAddAnime, IAnimeStatus } from "@/shared/types";
import { useAnimeStore } from "@/shared/stores/store";
export const useLKPage = () => {
    const { user } = storeToRefs(useAnimeStore());

    const { deleteUserAvatar } = useSupabaseAuth();
    const { getAnimeToHistory, getAnimeToStatus } = useSupabaseAnime();

    const animeList = ref<IAddAnime[] | IAnimeStatus[] | null>(null);

    const deleteAvatar = async (id: string) => {
        await deleteUserAvatar(id);
    };

    const isLoading = ref(false);
    const error = ref<unknown | null>(null);

    const getAnime = async (statusCode: string, id: string) => {
        try {
            isLoading.value = true;
            error.value = null;

            const data =
                statusCode === "history"
                    ? await getAnimeToHistory(id)
                    : await getAnimeToStatus(statusCode, id);

            if (data) {
                animeList.value = data;
            }
        } catch (err) {
            error.value = err;
            console.error("Ошибка загрузки:", err);
        } finally {
            isLoading.value = false;
        }
    };


    return {
        getAnime,
        user,
        deleteAvatar,
        animeList,
        isLoading
    }
}