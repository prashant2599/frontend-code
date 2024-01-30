"use client";

import { useToggleQuestion } from "@/app/contex/toggleQuestionContext";
const HeaderPopup = () => {
  const { togglePopup } = useToggleQuestion();

  return (
    <>
      <button
        className="qsk-question"
        onClick={togglePopup}
        style={{ cursor: "pointer" }}
      >
        Ask Free Question <img src="/images/whiteArrow.png" alt="icon" />
      </button>
    </>
  );
};

export default HeaderPopup;
