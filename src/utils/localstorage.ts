import { STORAGE_KEYS } from "@/types/localstorage"

export const getLocalStorage = (key: STORAGE_KEYS): string => {
    const value = localStorage.getItem(key)

    if (value === null) {
        return ""
    }
    return value
}

export const setLocalStorage = (key: STORAGE_KEYS, value: string) => {
    localStorage.setItem(key, value)
}

export const removeLocalStorage = (key: STORAGE_KEYS) => {
    localStorage.removeItem(key)
}

export const initLocalStorage = (key: STORAGE_KEYS) => {
    setLocalStorage(key, getLocalStorage(key))
}
