"use server"

import { cookies } from 'next/headers';
import { requestOptions } from '../constants';
import { redirect } from 'next/navigation';

export const register = async (formData: any) => {
    const body = {name: formData.get("name"), email: formData.get("email"), provider: formData.get("provider"), password: formData.get("password")}
    console.log ('xxx register body ', body)

    const res = await fetch(`${process.env.API_URL}/auth/register`, {
        ...requestOptions,
        body: JSON.stringify(body)
    });
    const result = await res.json();

    console.log ('xxx register result ', result)
    if (result.statusCode === 201) {
        cookies().set("token", result?.token || "TestToken")
        redirect("/")
    } else {
        return {success: false}
    }
}

export const login = async (formData: any) => {
    const body = {email: formData.get("email"),}

    console.log ('xxx login body ', body)

    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        ...requestOptions,
        body: JSON.stringify(body)
    });
    const result = await res.json();

    console.log ('xxx login result ', result)
    if (result.statusCode === 200 && result?.token) {
        cookies().set("token", result.token)
        redirect("/")
    } 
}