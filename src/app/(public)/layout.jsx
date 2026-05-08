import { Bebas_Neue, DM_Sans } from "next/font/google";

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

export const metadata = {
  title: "Glazing Gorilla Games",
  description:
    "Glazing Gorillas is a Roblox game studio creating original titles, live experiences, and brand collaborations inside one of gaming’s biggest platforms.",
};

export default function PublicRootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dm.variable}`}>
      <body>{children}</body>
    </html>
  );
}
