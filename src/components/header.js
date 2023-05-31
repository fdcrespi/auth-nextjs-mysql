import { Typography } from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    <Typography align="center" mt={2}>
      <Image src="/logo.png" alt="Logo" width={60} height={70} />
    </Typography>
  );
}