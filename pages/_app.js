import '../styles/admin/globals.css';
import Layout from '../components/admin/Layout.js'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
