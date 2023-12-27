import Link from "next/link";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import getALLBlogList from "@/app/lib/getAllBlogList";

const CategoryWiseBlogDetais = async () => {
  const dataa = await getAllSpeciality();
  const speciality = dataa.data.Speciality;

  //  blog list

  const recent = await getALLBlogList();
  const Rblog = recent.bloglist.data;

  const uniqueLocations = [...new Set(Rblog.map((e) => e.speciality_id))];
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
            {uniqueLocations.map((blog) => {
              const matchingSpecialities = speciality.filter(
                (speciality) => String(speciality.id) === String(blog)
              );

              return matchingSpecialities.map((e) => (
                <Link href={`/blogs/${e.slug}`} key={e.id}>
                  {e.name} Blogs
                </Link>
              ));
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryWiseBlogDetais;
