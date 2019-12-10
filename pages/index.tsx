import 'isomorphic-fetch'
import { NextPage } from 'next'
import Layout from '../components/Layout'

interface IProps {}

const Index: NextPage<IProps> = () => {
  return (
    <Layout>
      <h1>Next.js + Firebase starter</h1>
    </Layout>
  )
}

// interface Context extends NextPageContext {}

// Index.getInitialProps = async (ctx: Context) => {}

export default Index
