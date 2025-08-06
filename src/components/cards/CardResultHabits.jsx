import { IoCheckmarkSharp } from "react-icons/io5";
import { useEvaluation } from "../../context/EvaluationProvider";

export const CardResultHabits = () => {
  const {
    completEvaluation,
    loading: evaluationLoading,
    error: evaluationError,
  } = useEvaluation();

  if (evaluationLoading) return <p>Loading...</p>;
  if (evaluationError)
    return <p>Error loading evaluation data: {evaluationError.message}</p>;

  if (!completEvaluation || completEvaluation.length === 0) {
    return <p>No evaluation data found</p>;
  }

  const evaluation = completEvaluation[0];

  if (!evaluation.responses || evaluation.responses.length === 0) {
    return <p>No habits responses found</p>;
  }

  const habitCategories = [
    {
      name: "Hábitos de alimentación",
      questionIds: [22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    },
    {
      name: "Hábitos de sueño",
      questionIds: [37, 40],
    },
    {
      name: "Responsabilidades",
      questionIds: [41, 42, 43, 44, 45, 46, 47, 48],
    },
  ];

  const additionalQuestions = [
    {
      id: 39,
      description: "Duerme entre 10 y 12 horas",
    },
    {
      id: 49,
      description: "Utiliza pañal para dormir",
    },
    {
      id: 50,
      description: "Toma tetero",
    },
    {
      id: 51,
      description: "Razones por las que tiene menu especial",
    },
  ];

  const renderCategoryRow = (category) => {
    const responses = evaluation.responses.filter((response) =>
      category.questionIds.includes(response.questionId)
    );

     const groupedDescriptions = {
    1: [],
    2: [],
  };
  let hasOptionId3 = false;
  let hasOptionId4 = false;

    responses.forEach((response) => {
    if (response.optionId === 1 || response.optionId === 2) {
      groupedDescriptions[response.optionId].push(response.description);
    } else if (response.optionId === 3) {
      hasOptionId3 = true;
    } else if (response.optionId === 4) {
      hasOptionId4 = true;
    }
  });

  const hasOption1or2 = responses.some(
    (response) => response.optionId === 1 || response.optionId === 2
  );

    return (
      <tr key={category.name}>
      <td>{category.name}</td>
      <td className="table-primary">
        {hasOptionId4 && !hasOptionId3 && !hasOption1or2 && <IoCheckmarkSharp />}
      </td>
      <td className="table-success">
        {hasOptionId3 && !hasOption1or2 && <IoCheckmarkSharp />}
      </td>
      <td className="table-warning">
        {groupedDescriptions[2].length > 0 &&
          groupedDescriptions[2].map((alias, index) => <div key={index}>- {alias}</div>)}
      </td>
      <td className="table-danger">
        {groupedDescriptions[1].length > 0 &&
          <div style={{ whiteSpace: "pre-wrap" }}>
            {groupedDescriptions[1].map((alias, index) => (
              <div key={index}>- {alias}</div>
            ))}
          </div>
        }
      </td>
    </tr>
    );
  };

  const renderAdditionalQuestions = () => {
    return additionalQuestions.map((question) => {
      const response = evaluation.responses.find(
        (response) => response.questionId === question.id
      );
      return (
        <div key={question.id}>
          <strong>{question.description}:</strong>{" "}
          {response ? response.answer : "No hay respuesta"}
        </div>
      );
    });
  };

  return (
    <div>
      <h2 className="table-title" >Hábitos y Responsabilidades</h2>
      <table className="table table-hover results-container" >
        <thead className="result-titles">
          <tr>
            <th style={{ width: "15%", fontSize: "0.6em"}}>HÁBITOS Y RESPONSABILIDADES</th>
            <th className="table-primary" style={{ width: "15% "}}>ADQUIRIDO</th>
            <th className="table-success" style={{ width: "15% ", fontSize: "0.6em" }}>
              EN PROCESO AVANZADO DE ADQUISICIÓN
            </th>
            <th className="table-warning" style={{ width: "30% "}}>EN PROCESO INICIAL DE ADQUISICIÓN</th>
            <th className="table-danger" style={{ width: "30% "}}>NO ADQUIRIDO</th>
          </tr>
        </thead>
        <tbody className="result-titles">
          {habitCategories.map((category) => renderCategoryRow(category))}
        </tbody>
      </table>
      <h2 className="additional-questions-title">Preguntas adicionales</h2>
      <div className="additional-questions">{renderAdditionalQuestions()}</div>
    </div>
  );
};

export default CardResultHabits;


// EN PROCESO EL CAMBIO DE LOS ITEMS A SER RENDERIZADOS EN LOS RESULTADOS.
