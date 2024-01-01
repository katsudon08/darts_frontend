import { STRAGE_KEYS } from "@/types/localstrage"

export const getLocalStrage = (key: STRAGE_KEYS): string => {
    const value = localStorage.getItem(key)

    if (value === null) {
        return ""
    }
    return value
}

export const setLocalStrage = (key: STRAGE_KEYS, value: string) => {
    localStorage.setItem(key, value)
}

export const removeLocalStrage = (key: STRAGE_KEYS) => {
    localStorage.removeItem(key)
}

export const initLocalStrage = (key: STRAGE_KEYS) => {
    setLocalStrage(key, getLocalStrage(key))
}
