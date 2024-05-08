import { Maybe } from '@/types/maybe.type'

export const fileToBase64 = (file: File): Promise<Maybe<string>> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result?.toString()?.split('base64,')[1])
        }
        reader.onerror = reject
    })
}
