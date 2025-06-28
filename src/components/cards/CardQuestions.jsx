import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import { useChild } from "../../context/ChildProvider";
import { useNavigate } from "react-router-dom";
import { useSubmitEvaluation } from "../../services/hooks/useSubmitEvaluation";
import QuestionCarousel from "./QuestionCarousel";

const CardQuestions = ({ questionsData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [resultsSent, setResultsSent] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const {
    data: childData,
    loading: childLoading,
    error: childError,
  } = useChild();
  const navigate = useNavigate();
  const {
    submitEvaluation,
    loading: submitting,
    error: submitError,
  } = useSubmitEvaluation(`${import.meta.env.VITE_API_URL}/completevaluation`);

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      const savedResponses = sessionStorage.getItem("userResponses");
      if (savedResponses) {
        setUserResponses(JSON.parse(savedResponses));
      } else {
        setUserResponses(Array(questionsData[0].questions.length).fill(null));
      }
    }
  }, [questionsData]);

  const handleAnswer = (choice) => {
    const updatedResponses = [
      ...userResponses.slice(0, currentQuestion),
      {
        optionId: choice.id,
        answer: choice.label,
        description: questionsData[0].questions[currentQuestion].description,
      },
      ...userResponses.slice(currentQuestion + 1),
    ];
    setUserResponses(updatedResponses);
    sessionStorage.setItem("userResponses", JSON.stringify(updatedResponses));
  };

  const handleBeforeQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleNextQuestion = async () => {
    const nextQuestion = currentQuestion + 1;

    if (questionsData && nextQuestion < questionsData[0].questions.length) {
      setCurrentQuestion(nextQuestion);
      setResultsSent(false);
    } else {
      if (userResponses.includes(null)) {
        alert("Responde todas las preguntas antes de enviar los resultados");
      } else {
        const dataToSend = {
          evaluationId: questionsData[0]._id,
          evaluationtoken: childData.evaluationtoken,
          responses: userResponses.map((response, index) => ({
            questionId: questionsData[0].questions[index].id,
            optionId: response.optionId,
            description: response.description,
            answer: response.answer,
          })),
        };

        const responseData = await submitEvaluation(dataToSend);
        if (responseData) {
          console.log("Respuestas enviadas correctamente:", responseData);
          setResultsSent(true);
          alert(
            "Resultados enviados correctamente. Por favor, haga clic en el botón de resultados."
          );
          sessionStorage.removeItem("userResponses");
          navigate("/token");
        } else {
          console.error("Error submitting responses:", submitError);
        }
      }
    }
  };

  if (childLoading) return <p>Loading child data...</p>;
  if (childError) return <p>Error loading child data: {childError.message}</p>;

  if (
    !Array.isArray(questionsData) ||
    questionsData.length === 0 ||
    !Array.isArray(questionsData[0]?.questions) ||
    questionsData[0].questions.length === 0
  ) {
    return <p>Loading questions...</p>;
  }
  
  const currentQuestionData = questionsData[0].questions[currentQuestion];

  return (
    <div className="question-main-container">
      <div> Niño: {childData?.firstName}</div>
      <Card
        title={currentQuestionData.title}
        description={currentQuestionData.description}
        options={currentQuestionData.options}
        handleAnswer={handleAnswer}
        userResponse={userResponses[currentQuestion]?.optionId || null}
        currentQuestion={currentQuestion}
      />
      <div className="question-counter">
        Pregunta {currentQuestion + 1} de {questionsData[0].questions.length}
      </div>
   
      <div className="btn-container">
        <button
          onClick={handleBeforeQuestion}
          className="btn-color"
          hidden={currentQuestion <= 0 || resultsSent}
        >
          {resultsSent || currentQuestion === 0 ? "inactivo" : "Anterior"}
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={
            !userResponses[currentQuestion]?.optionId ||
            resultsSent ||
            submitting
          } 
          className="btn-color next-button"
        >
          {submitting
            ? "Enviando..."
            : resultsSent
            ? "Resultados Enviados"
            : "Siguiente"}
        </button>
        {submitError && <p>Error submitting data: {submitError.message}</p>}
      </div>
      <div>
        <QuestionCarousel
          questions={questionsData[0].questions}
          currentQuestion={currentQuestion}
          onQuestionClick={setCurrentQuestion}
          userResponses={userResponses}
          className="question-carousel"
        />
      </div>
    </div>
  );
};

export default CardQuestions;
