import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import router from 'next/router'
import Loading from '@/components/loading'

export default function Login() {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch('/api/auth/isAuthenticated');
      if (response.ok) {
        router.push('/');
      } else setLoading(false);
    }
    checkUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* console.log({
      email: data.get('email'),
      password: data.get('password'),
    }); */

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    });
    if (response.ok) {
      router.push('/');      
    } else {
      switch (response.status) {
        case 401:
          setMessage("Email o contraseña invalidos");
          break;
        case 500:
          setMessage("Error interno del servidor");
          break;
        case 400:
          setMessage("Se deben completar todos los campos");
          break;
        default:
          break;
      }
    }
  };

  const inputClick = () => {
    setMessage('');
  }

  if (loading) {
    return (
     <Loading />
    )
  }

  return (
    <>
      <main className={styles.main}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, minWidth: 300},
            alignItems: 'center',
          }}
          validate="true"
          autoComplete="off"
        >
          <Typography component="h1" variant="h5" 
            sx={{
              textAlign: 'center',
            }}
          >
            Iniciar sesión
          </Typography>
          <TextField
            required
            id="email"
            name='email'
            label="Email"
            type="text"
            onFocus={inputClick}
            fullWidth
            autoComplete='email'
          />
          <TextField
            required
            id="password"
            name='password'
            label="Contraseña"
            type="password"
            onFocus={inputClick}
            fullWidth
            autoComplete="password"
          />
          {message && <Alert severity="error">{message}</Alert>}
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
          </Button>
          <Grid container sx={{justifyContent: 'space-between'}}>
            <Grid item sx={{mt: 1}}>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item sx={{mt: 1}}>
              <Link href="/register" variant="body2">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box
          component="button"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, minWidth: 300},
            alignItems: 'center',
            border: 'none',
            backgroundColor: 'transparent',
            marginTop: 2,
          }}

        >
          <Typography component="h1" variant="h6">
            Pagar factura con DNI / CUIT
          </Typography>
          <Button
              href='https://cajeroenlinea.celtatsas.com.ar'
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Pagar facturas
          </Button>
        </Box>
        
      </main>
    </>
  )
}
