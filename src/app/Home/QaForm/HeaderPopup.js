"use client";

import { useToggleQuestion } from "@/app/contex/toggleQuestionContext";
const HeaderPopup = () => {
  const { togglePopup, isPopupOpen } = useToggleQuestion();

  // form popup post method

  // form popup scripts
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const togglePopup = () => {
  //   setIsPopupOpen((prev) => !prev);
  // };

  return (
    <>
      <a
        className="qsk-question"
        onClick={togglePopup}
        style={{ cursor: "pointer" }}
      >
        Ask FREE Question <img src="/images/whiteArrow.png" alt="icon" />
      </a>
    </>
  );
};

export default HeaderPopup;
