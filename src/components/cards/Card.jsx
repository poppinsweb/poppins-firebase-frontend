import React from "react";
import { FaCheck } from "react-icons/fa";
import { InfoCard } from "./InfoCard.jsx";
import "../../styles/users/questions.css";

const Card = ({
  title,
  description,
  options,
  handleAnswer,
  userResponse,
  currentQuestion,
}) => {
  return (
    <>
      <InfoCard />
      <div className="question-container-questions">
        <h3 className="secoundary-question-title">{title}</h3>
        <h2>{description}</h2>
        <ul className="question-section">
          {options.map((option, index) => (
            <div key={index} className="question-li">
              <li
                onClick={() =>
                  handleAnswer({
                    id: option.id,
                    score: option.score,
                    label: option.label,
                  })
                }
                className={
                  userResponse === option.score
                    ? "selected-answer question-text"
                    : null
                }
              >
                {option.label}
                {userResponse === option.id && (
                  <div className="icon-container">
                    <FaCheck className="check-icon" />
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Card;
