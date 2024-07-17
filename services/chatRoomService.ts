'use server'
import { requestOptions } from "@/constants"
import { getToken } from "./request"

export const createChatRoom = async(data: any) => {
    const reqOptions = {...requestOptions, headers: {...requestOptions.headers, authorization: getToken()}, body: JSON.stringify(data)}

    try {
        const res = await fetch(`${process.env.API_URL}/group`, reqOptions)
        const result = await res.json()
        if (result.statusCode === 201) {
            return {success: true, data: result.data}
        }
        return {success: false}
        
    } catch (error) {
        return {success: false}
    }

}