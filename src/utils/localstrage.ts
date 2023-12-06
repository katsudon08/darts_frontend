import { KEYS } from '@/types/localstrage'

export const getLocalStrage = (key: KEYS): string => {
    const value = localStorage.getItem(key)

    if (value === null) {
        return ''
    }
    return value
}

export const setLocalStrage = (key: KEYS, value: string) => {
    localStorage.setItem(key, value)
}

export const removeLocalStrage = (key: KEYS) => {
    localStorage.removeItem(key)
}

export const initLocalStrage = (key: KEYS) => {
    setLocalStrage(key, getLocalStrage(key))
}
