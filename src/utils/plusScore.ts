import { STORAGE_KEYS } from "@/types/localstorage"
import { getLocalStorage, setLocalStorage } from "./localstorage"

export const plusScore = (key: STORAGE_KEYS, score: number) => {
    const storageScore = Number(getLocalStorage(key))
    const newScore = storageScore + score
    setLocalStorage(key, String(newScore))
}