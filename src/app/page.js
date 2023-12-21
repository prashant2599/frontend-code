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
import NewHeader from "./Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "./Home/NewUIHomepage/inc/NewFooter";

export default function Home() {
  return (
    <main>
      <NewHeader />
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
     <NewFooter />
    </main>
  );
}
