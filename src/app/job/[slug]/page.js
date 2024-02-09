import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import Link from "next/link";
import ApplyNowForm from "./ApplyNowForm";

const page = async ({ params }) => {
  const combinedSlug = params.slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${combinedSlug}`,
    { cache: "no-store" }
  );
  const datas = await res.json();
  const jobInfo = datas.data;
  return (
    <>
      <NewHeader />
      <section className="job-description" id="medflick-disclaimer">
        <div className="midbox-inner  wiki-mk">
          <Link href="/careers" className="back-to-job">
            <img src="/images/back.png" alt="back-arrow" /> Back to job openings
          </Link>

          <h1>{jobInfo.name}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: jobInfo.long_description,
            }}
          />
        </div>
      </section>
      <ApplyNowForm />
      <NewFooter />
    </>
  );
};

export default page;
