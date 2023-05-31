export default async function logout(req, res) {
  try {
    res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Hubo un error' });
  }
}