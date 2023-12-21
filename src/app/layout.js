import Footer from "./Home/Inc/Footer";
import Header from "./Home/Inc/Header";
import GoogleAnalytics from "./Home/googleAnalytics/GoogleAnalytics";
import Allpopudp from "./Home/popupAllpage/Allpopudp";
import "./globals.css";
import "./index.css";
import { UserProvider } from "./UserContext";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { DoctorDataProvider } from "./contex/DoctorDataContext";
import { HospitalDataProvider } from "./contex/HospitalDataContext";
import NewHeader from "./Home/NewUIHomepage/inc/NewHeader";
import PatientHeader from "./(patient)/Inc/PatientHeader";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medflick: Find Treatments Top Rated Doctors & Hospitals India",
  description:
    "Welcome to MedFlick - your trusted healthcare ally. We connect you with India's best hospitals and doctors for personalized treatment and affordable care",
  icons: {
    icon: ["/favicon.png"],
  },
  openGraph: {
    title: "Medflick: Find Treatments Top Rated Doctors & Hospitals India",
    description:
      "Welcome to MedFlick - your trusted healthcare ally. We connect you with India's best hospitals and doctors for personalized treatment and affordable care",
    images: "https://medflick.com/images/2023/02/logo.png",
  },
  alternates: {
    canonical: `https://medflick.com`,
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <NextTopLoader color="#ffffff" showSpinner={false} />
          <UserProvider>
            <Allpopudp />
            <GoogleAnalytics />
            <DoctorDataProvider>
              <HospitalDataProvider>{children}</HospitalDataProvider>
            </DoctorDataProvider>
          </UserProvider>
        </body>
      </html>
    </>
  );
}
