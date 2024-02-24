'use client'

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { ThemeSwitch } from '@/components/ThemeSwitcher'
import CustomInput from '@/components/forms/CustomInput'
import { createUser } from './actions/createUser'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useLoading from '@/hooks/useLoading'

const schema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(4, 'Password is required, at least 4 characters'),
    confirmPassword: z
      .string()
      .min(4, 'Confirm password is required, at least 4 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

const PageSignUp = () => {
  const router = useRouter()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const { confirmPassword, ...formatData } = data
    startLoading()
    const create = await createUser(formatData)
    if (create.status) {
      toast.success(create.message)
      router.push('/login')
    } else {
      toast.error(create.message)
    }
    stopLoading()
  }

  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <div className="fixed right-5 top-5 ">
        <ThemeSwitch />
      </div>
      <Card className="w-[calc(100vw-2rem)] sm:w-[400px]">
        <CardHeader>
          <h1 className="text-xl font-medium">Sign Up</h1>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <CustomInput form={form} label="Username" name="username" />
              <CustomInput
                form={form}
                type="email"
                label="Email"
                name="email"
              />
              <CustomInput
                form={form}
                type="password"
                label="Password"
                name="password"
              />
              <CustomInput
                form={form}
                type="password"
                label="Confirm Password"
                name="confirmPassword"
              />
            </div>
            <Button type="submit" color="primary" isLoading={isLoading}>
              Sign Up
            </Button>
            <div className="flex items-center gap-4 w-full py-4">
              <div className="h-[2px] w-full bg-content2" />
              <span className="text-sm">OR</span>
              <div className="h-[2px] w-full bg-content2" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="bordered"
                startContent={<FcGoogle className="text-xl" />}
                onClick={() => signIn('google', { callbackUrl: '/home' })}
              >
                Continue with Google
              </Button>
              <Button
                variant="bordered"
                startContent={<FaGithub className="text-xl" />}
                onClick={() => signIn('github', { callbackUrl: '/home' })}
              >
                Continue with GitHub
              </Button>
            </div>
            <p className="text-center text-sm pt-2">
              Already have an account?{' '}
              <Link
                className="text-primary opacity-90 hover:opacity-100 transition-colors"
                href="/login"
              >
                Log In
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  )
}

export default PageSignUp
