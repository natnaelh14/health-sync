'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { SignInResponse } from "next-auth/lib/client"
import { signIn } from "next-auth/react"
import router from "next/router"

import { LoginFormDataSchema } from '~/lib/schema'
import { useSearchParams } from 'next/navigation'

type Inputs = z.infer<typeof LoginFormDataSchema>

export default function RhfWithZod() {
  const [data, setData] = useState<Inputs>()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    const callbackUrl = searchParams.get("callbackUrl")
    signIn("credentials", {
        email: data.email,
        password: data.password,
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
    reset()
    setData(data)
  }

  return (
    <section className='flex gap-6'>
      <form
        onSubmit={handleSubmit(processForm)}
        className='flex flex-1 flex-col gap-4 sm:w-1/2'
      >
        <input
          placeholder='Email'
          className='rounded-lg'
          {...register('email')}
        />
        {errors.email?.message && (
          <p className='text-sm text-red-400'>{errors.email.message}</p>
        )}

        <input
          placeholder='Password'
          className='rounded-lg'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='text-sm text-red-400'>{errors.password.message}</p>
        )}

        <button className='rounded-lg bg-black py-2 text-white'>Submit</button>
      </form>

      <div className='flex-1 rounded-lg bg-cyan-600 p-8 text-white'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  )
}