import GoogleAnalytics from "./Home/googleAnalytics/GoogleAnalytics";
import Allpopudp from "./Home/popupAllpage/Allpopudp";
import "./globals.css";
import "./index.css";
import { UserProvider } from "./UserContext";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToggleQuestionProvider } from "./contex/toggleQuestionContext";
import QuestionPopup from "./Home/QaForm/QuestionPopup";
import "intl-tel-input/build/css/intlTelInput.css";

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
          <NextTopLoader color="#ffffff" showSpinner={false} height={4} />
          <UserProvider>
            <ToggleQuestionProvider>
              <Allpopudp />
              <QuestionPopup />
              <GoogleAnalytics />
              {children}
            </ToggleQuestionProvider>
          </UserProvider>
        </body>
      </html>
    </>
  );
}
