import Link from "next/link";

const AllDoctorPagination = ({ pageNumber, count }) => {
  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(count / itemsPerPage);

  // Set the number of pages to display around the current page
  const displayPages = 5; // You can adjust this based on your preference

  // Calculate the start and end page numbers for display
  let startPage = Math.max(1, pageNumber - Math.floor(displayPages / 2));
  let endPage = Math.min(totalPages, startPage + displayPages - 1);

  // Adjust the start page if the end page is at the maximum
  startPage = Math.max(1, endPage - displayPages + 1);

  // Generate an array of page numbers
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="list-item-no">
        <ul>
          {startPage > 1 && (
            <li>
              <Link href={`/doctors`}>1</Link>
            </li>
          )}
          {startPage > 2 && <li>...</li>}
          {pages.map((e) => (
            <li key={e}>
              <Link
                href={e == 1 ? `/doctors` : `/doctors/page/${e}`}
                className={e == pageNumber ? "active" : ""}
              >
                {e}
              </Link>
            </li>
          ))}
          {endPage < totalPages - 1 && <li>...</li>}
          {endPage < totalPages && (
            <li>
              <Link href={`/doctors/page/${totalPages}`}>{totalPages}</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default AllDoctorPagination;
