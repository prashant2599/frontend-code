import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPopUp = ({ showLoginPopup, onClose, url }) => {
  const router = useRouter();

  useEffect(() => {
    if (showLoginPopup) {
      localStorage.setItem("previousUrl", url);
      const timerId = setTimeout(() => {
        router.push("/login");
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [showLoginPopup, router, url]);

  return (
    <>
      <div
        className="popup"
        data-popup="popup-6"
        style={{ display: showLoginPopup ? "block" : "none" }}
      >
        <div className="popup-inner6">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-6"
                data-dismiss="modal"
                onClick={onClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="success-message">
              <img src="/images/Login.png" />
              <h4>Please Login</h4>
              {/* <p>To Comment Please Login First!</p> */}
            </div>
            {/* <Link href="/login">
              <button>Login Now</button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopUp;
