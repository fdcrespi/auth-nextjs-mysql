import Loading from '@/components/loading';
import router from 'next/router'
import { useEffect, useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch('/api/auth/isAuthenticated');
      const data = await response.json();
      if (!response.ok) {
        router.push('/login');
      } else {
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const getUsers = async() => {
    const response = await fetch('/api/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('error', data);
    }
    setUsers(data);
    console.log('users', data);
  }

  useEffect(() => {
    if (token) getUsers();
  }, [token]);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <h1>Bienvenido {user.email}</h1>
    </>
  )
}
