import { z } from 'zod'

export const LoginFormDataSchema = z.object({
  email: z.string().nonempty('Name is required.'),
  password: z
    .string()
    .nonempty('Message is required.')
    .min(6, { message: 'Message must be at least 6 characters.' })
})