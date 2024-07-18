"use server"
import { getToken } from "./request"
import { redirect } from "next/navigation"

export const messageListFetcher = async (url: string) => {
    const requestOptions = {headers: {authorization: getToken()}}
    try {
        const res = await fetch(`${process.env.API_URL}${url}`, requestOptions)
        const result = await res.json()

        if (result.statusCode === 401) {
            redirect("/auth/login")
        }
        return {success: true, data: result.data}
    } catch (error) {
        return {success: false, data: null}
    }
}