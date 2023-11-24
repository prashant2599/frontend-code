import About from "./Home/About";
import Blog from "./Home/Blog";
import DoctorExpert from "./Home/DoctorExpert";
import DoctorSection from "./Home/DoctorSection";
import ExplorHealth from "./Home/ExplorHealth";
import Faq from "./Home/Faq";
import HealthPackage from "./Home/HealthPackage";
import HealthQuerys from "./Home/HealthQuerys";
import HospitalSection from "./Home/HospitalSection";
import InternationalPlatform from "./Home/InternationalPlatform";
import NewAboutSection from "./Home/NewUIHomepage/NewAboutSection";
import NewBlogs from "./Home/NewUIHomepage/NewBlogs";
import NewCostSection from "./Home/NewUIHomepage/NewCostSection";
import NewFaq from "./Home/NewUIHomepage/NewFaq";
import NewFindHospitalDoctors from "./Home/NewUIHomepage/NewFindHospitalDoctors";
import NewHospital from "./Home/NewUIHomepage/NewHospital";
import NewMakeUsBetter from "./Home/NewUIHomepage/NewMakeUsBetter";
import NewProgcess from "./Home/NewUIHomepage/NewProgcess";
import NewQuestionAns from "./Home/NewUIHomepage/NewQuestionAns";
import NewSearchTreatment from "./Home/NewUIHomepage/NewSearchTreatment";
import NewSection1 from "./Home/NewUIHomepage/NewSection1";
import NewStayInTouch from "./Home/NewUIHomepage/NewStayInTouch";
import NewTestomonials from "./Home/NewUIHomepage/NewTestomonials";
import NewVideoSection from "./Home/NewUIHomepage/NewVideoSection";
import NewVisaTravelSection from "./Home/NewUIHomepage/NewVisaTravelSection";
import Section1 from "./Home/Section1";
import Section2 from "./Home/Section2";
import Section3 from "./Home/Section3";
import Testimonials from "./Home/Testimonials";
import WorldMap from "./Home/WorldMap";
import NewBlogPage from "./blogs/NewBlogPage";

export default function Home() {
  return (
    <main>
      <NewSection1 />
      <NewHospital />
      <NewSearchTreatment />
      <NewProgcess />
      <NewCostSection />
      <NewVisaTravelSection />
      <NewAboutSection />
      <NewMakeUsBetter />
      <NewVideoSection />
      <NewQuestionAns />
      <NewTestomonials />
      <NewFaq />
      <NewBlogs />
      <NewFindHospitalDoctors />
      <NewStayInTouch />
      {/* <Section1 />
      
        <Section2 />
        <Section3 />
        <HospitalSection />
        <DoctorExpert />
        <ExplorHealth />
        <InternationalPlatform />
        <DoctorSection />
        <HealthPackage />
        <HealthQuerys />
        <Testimonials />
        <About />
        <WorldMap />
        <Faq />
        <Blog /> */}
    </main>
  );
}
