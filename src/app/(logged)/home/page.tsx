'use client'

import Header from '@/components/Header'
import { Card, CardBody } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

const PageHome = () => {
  const { data } = useSession()
  console.log('🚀 ~ PageHome ~ data', data)

  return (
    <main>
      <Header />
      <Card className="mx-6 mt-4">
        <CardBody>
          <h1>Home</h1>
        </CardBody>
      </Card>
    </main>
  )
}

export default PageHome
