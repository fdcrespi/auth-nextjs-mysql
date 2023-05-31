import '@/styles/globals.css'
import Header from '@/components/header'
import Copyright from '@/components/copyright'
import { Container } from '@mui/material'

export default function App({ Component, pageProps }) {
  return (
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
  )
}
