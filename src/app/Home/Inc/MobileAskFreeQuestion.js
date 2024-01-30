"use client";
import { useToggleQuestion } from "@/app/contex/toggleQuestionContext";
import QuestionPopup from "../QaForm/QuestionPopup";

const MobileAskFreeQuestion = () => {
  const { togglePopup } = useToggleQuestion();
  return (
    <>
      <button
        className="qsk-question"
        onClick={togglePopup}
        style={{ color: "#ff6800 !important" }}
      >
        Ask Free Question <img src="/images/whiteArrow.png" alt="icon" />
      </button>
      <QuestionPopup />
    </>
  );
};

export default MobileAskFreeQuestion;
