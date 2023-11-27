import Link from "next/link";

const NumberPage = ({ blogs }) => {
  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(blogs / itemsPerPage);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className="list-item-no">
        <ul>
          {pages.map((page) => (
            <li key={page}>
              <Link href={`/blogs/page/${page}`}>
                <a className={page === 1 ? "active" : ""}>{page}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NumberPage;
