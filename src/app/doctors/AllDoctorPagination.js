import Link from "next/link";

const AllDoctorPagination = ({pageNumber, count }) => {
  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(count / itemsPerPage);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <>
      <div className="list-item-no">
        <ul>
          {pages.map((e) => (
            <li key={e}>
              <Link href={`/doctors/page/${e}`} className={e == pageNumber ? "active" : ""}>{e}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllDoctorPagination;
