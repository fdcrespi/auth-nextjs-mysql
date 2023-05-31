import Loading from '@/components/loading';
import router from 'next/router'
import { useEffect, useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch('/api/auth/isAuthenticated');
      if (!response.ok) {
        router.push('/login');
      } else setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <h1>Home</h1>
    </>
  )
}