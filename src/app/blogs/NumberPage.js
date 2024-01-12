import Link from "next/link";

const NumberPage = ({ totalCount,pageNumber }) => {
  // const itemsPerPage = 10; // You can adjust this based on your preference
  // const totalBlogs = blogs.length;
  // const totalPages = Math.ceil(totalBlogs / itemsPerPage);


  // // Generate an array of page numbers
  // const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


  return (
    <>
      <div className="list-item-no">
        <ul>
          {pages.map((page) => (
            <li key={page}>
              <Link
                href={`/blogs/page/${page}`}
                className={page === 1 ? "active" : ""}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NumberPage;
