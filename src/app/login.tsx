"use client"

import { useSearchParams } from "next/navigation"
import type { SignInResponse } from "next-auth/lib/client"
import { signIn } from "next-auth/react"
import router from "next/router"

export default function LoginForm() {
    const searchParams = useSearchParams()

    async function login({ email, password }: never) { 
        const callbackUrl = searchParams.get("callbackUrl")
        signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        })
            .then((res: SignInResponse | undefined) => {
                if (!res) {
                    alert("No response!")
                    return
                }

                if (!res.ok)
                    alert("Something went wrong!")
                else if (res.error) {
                    console.log(res.error)

                    if (res.error == "CallbackRouteError")
                        alert("Could not login! Please check your credentials.")
                    else
                        alert(`Internal Server Error: ${res.error}`)
                } else {
                    if (callbackUrl)
                        router.push(callbackUrl)
                    else
                        router.push("/")
                }
            })
    }

    return (
        <div>
            <h1>Sign in</h1>
        </div>
    )
}