"use server"
import { redirect } from "next/navigation"
import { getToken } from "./request"

export const userListFetcher = async (searchString: string) => {
    const requestOptions = {headers: {authorization: getToken()}}
    try {
        const res = await fetch(`${process.env.API_URL}/users?searchString=${searchString}`, requestOptions)
        const result = await res.json()

        if (result.statusCode === 401) {
            redirect("/auth/login")
        }
        return {success: true, data: result.data}
    } catch (error) {
        return {success: false, data: null}
    }
}

export const friendListFetcher = async (url: string) => {
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