import axios from "axios";

const DeleteAccount = ({ patientId }) => {
  const handleDelete = () => {
    // Make a DELETE request using Axios
    axios
      .get(`https://dev.medflick.com/api/deleteaccount/${patientId}`, {
        // Include any additional options like data, auth, etc.
      })
      .then((response) => {
        // Handle success (optional)

        console.log("Account deleted successfully");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");

        // Clear the user name in the component state

        window.location.reload();
        alert("Account deleted successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("There was a problem deleting the account:", error);
        alert("There was a problem deleting the account");
      });
  };

  const handleConfirmation = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      handleDelete();
    }
  };
  return (
    <>
      <div className="cancel-appointment">
        <p>
          Once you&apos;ve deleted your account, you will no longer be able to
          login to the Medflick site. This action cannot be undone.
        </p>
        <a onClick={handleConfirmation} style={{ cursor: "pointer" }}>
          Delete Account
        </a>
      </div>
    </>
  );
};

export default DeleteAccount;
