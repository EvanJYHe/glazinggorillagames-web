import { Bebas_Neue, DM_Sans, Inter } from "next/font/google";

import "../globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas",
});

const dm = DM_Sans({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Glazing Gorilla Games",
  description:
    "Glazing Gorillas is a Roblox game studio creating original titles, live experiences, and brand collaborations inside one of gaming’s biggest platforms.",
};

export default function PublicRootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dm.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
