const QuestionCarousel = ({ questions, currentQuestion, onQuestionClick, userResponses }) => {
  return (
    <div className="question-carousel">
      {questions.map((question, index) => (
        <button
          key={index}
          className={`carousel-button ${index === currentQuestion ? 'active' : ''} ${userResponses[index] ? 'answered' : ''}`}
          onClick={() => onQuestionClick(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionCarousel;
