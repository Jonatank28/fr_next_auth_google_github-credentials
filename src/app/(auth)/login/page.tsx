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
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useLoading from '@/hooks/useLoading'

const schema = z.object({
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

const PageLogin = () => {
  const router = useRouter()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    startLoading()
    const res = await signIn<'credentials'>('credentials', {
      ...data,
      redirect: false,
    })
    if (res?.error) {
      toast.error(res.error)
    } else {
      router.replace('/home')
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
          <h1 className="text-xl font-medium">Log In</h1>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
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
            </div>
            <Button type="submit" color="primary" isLoading={isLoading}>
              Login
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
              Need to create an account?{' '}
              <Link
                className="text-primary opacity-90 hover:opacity-100 transition-colors"
                href="/signUp"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  )
}

export default PageLogin
