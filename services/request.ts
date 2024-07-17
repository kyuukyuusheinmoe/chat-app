import { cookies } from "next/headers"

export const getToken = () => `Bearer ${cookies().get("token")?.value}`;