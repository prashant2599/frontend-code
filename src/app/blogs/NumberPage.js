import Link from "next/link";

const NumberPage = () => {
  return (
    <>
      <div class="list-item-no">
        <ul>
          <li>
            <a class="active">1</a>
          </li>
          <li>
            <Link href={`/blogs/page/${2}`}>2</Link>
          </li>
          <li>
            <Link href={`/blogs/page/${3}`}>3</Link>
          </li>
          <li>
            <Link href={`/blogs/page/${4}`}>4</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NumberPage;
