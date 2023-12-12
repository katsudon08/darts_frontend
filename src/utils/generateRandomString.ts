export const generateRandomString = (charCount = 5) => {
    const randomString = Math.random().toString(36).substring(2).slice(-charCount)
    return randomString
}