import Header from '@/components/Header'
import { Card, CardBody } from '@nextui-org/react'

const PageHome = () => {
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
