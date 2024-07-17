"use server"
export const friendListFetcher = async (searchString: string) => {
    try {
        const res = await fetch(`${process.env.API_URL}/users?searchString=${searchString}`)
        const result = await res.json()

        console.log ('xxx friend list res ', res)
        return {data: result.data}
    } catch (error) {
        return {data: null}
    }
}