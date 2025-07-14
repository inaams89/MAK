import "./globals.css";



export const metadata = {
  title:"Mak Security UK | Professional Security Solutions",
  description:  "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
  keywords: "security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK",
  openGraph: {
    title:
    
      "Mak Security UK | Professional Security Solutions",
    description:
   "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
    url: `mak-security-uk}`,
    images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mak Security UK | Professional Security Solutions",
    description:
   "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
    url: `mak-security-uk}`,
    images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
  },
};;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
                  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

        
        {children}
      </body>
    </html>
  );
}
