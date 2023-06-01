import '@/styles/globals.css'
import Header from '@/components/header'
import Copyright from '@/components/copyright'
import { Container } from '@mui/material'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Celta - Virtual</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat|Roboto"
        />
      </Head>
      <Container 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'space-between',
        }}
      >
        <Header />
        <Component {...pageProps} />
        <Copyright mb={2} mt={2} />
      </Container>
    </>
  )
}
