"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const requestOptions = {
    headers: {
        authorization: `Bearer ${cookies().get("token")?.value}`
    }
}

console.log (`Bearer ${cookies().get("token")}`)
export const friendListFetcher = async (searchString: string) => {
    try {
        const res = await fetch(`${process.env.API_URL}/users?searchString=${searchString}`, requestOptions)
        const result = await res.json()

        console.log ('xxx friend list res ', res)
        if (result.statusCode === 401) {
            redirect("/auth/login")
        }
        return {success: true, data: result.data}
    } catch (error) {
        return {success: false, data: null}
    }
}