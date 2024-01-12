import Link from "next/link";
import getAllSpeciality from "@/app/lib/getAllSpeciality";

const CategoryWiseBlogDetais = async () => {
  const dataa = await getAllSpeciality();
  const speciality = dataa.data.Speciality;


  return (
    <>
      <section id="related-blog">
        <div className="midbox-inner  wiki-mk">
          <div className="blog-content">
            <div className="blog-cont-left">
              <h2>
                All <span>Category</span>
              </h2>
            </div>
          </div>

          <div className="symptoms-nav">
            {speciality.map((e) => (
              <Link href={`/blogs/${e.slug}`} key={e.id}>
                {e.name} Blogs
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryWiseBlogDetais;
