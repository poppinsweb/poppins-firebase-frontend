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
      habitNames: [
        "Agregar frutas a su alimentación.",
        "Agregar verduras a su alimentación.",
        "Agregar proteínas a su alimentación.",
        "Tomar jugos naturales.",
        "Comer la misma comida que el resto de la familia.",
        "Desayunar antes de ir a estudiar.",
        "Establecer horarios para comer.",
        "Comer sin usar pantallas.",
        "Comer sin usar juguetes.",
        "Comer en mesa o comedor.",
        "Permanecer sentado hasta finalizar la comida o sentirse saciado.",
        "Comer todo sin requerir suplementos nutricionales adicionales, con supervisión del pediatra.",
        "Peso no acorde para su talla. Debería consultar a su pediatra.",
        "Establecer una meta paulatina para comer en máximo 30 minutos.",
        "Procesamiento de los alimentos (cortarlos, desmecharlos o volverlos papilla)",
      ],
      questionIds: [22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    },
    {
      name: "Hábitos de sueño",
      habitNames: [
        " establecer un horario para ir a dormir",
        " establecer una meta para dormir con las luces apagadas",
      ],
      questionIds: [37, 40],
    },
    {
      name: "Responsabilidades",
      habitNames: [
        " que el niño ayude con la preparación de su uniforme en las noches",
        " que el niño ayude con la preparación de su maleta para el colegio",
        " que el niño recoja y organice sus juguetes",
        "Recoger y llevar a su lugar su ropa sucia y zapatos",
        "Recoger el plato después de comer",
        "Asignación de oficios que benefician a la familia",
        "Establecimiento de horarios y rutinas",
        "Cumplimiento con horarios y rutinas acordadas",
      ],
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

  const renderDescriptions = (descriptions) => {
    if (!descriptions) return null;
    return descriptions
      .split("-")
      .map((item, index) => <div key={index}>- {item.trim()}</div>);
  };

  const renderCategoryRow = (category) => {
    const responses = evaluation.responses.filter((response) =>
      category.questionIds.includes(response.questionId)
    );

     const groupedAliases = {
    1: [],
    2: [],
  };
  let hasOptionId3 = false;
  let hasOptionId4 = false;

    responses.forEach((response) => {
    const idx = category.questionIds.indexOf(response.questionId);
    const alias = category.habitNames[idx] || "";
    if (response.optionId === 1 || response.optionId === 2) {
      groupedAliases[response.optionId].push(alias);
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
        {groupedAliases[2].length > 0 &&
          groupedAliases[2].map((alias, index) => <div key={index}>- {alias}</div>)}
      </td>
      <td className="table-danger">
        {groupedAliases[1].length > 0 &&
          <div style={{ whiteSpace: "pre-wrap" }}>
            {groupedAliases[1].map((alias, index) => (
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
            <th className="table-warning" style={{ width: "30% "}}>EN PROCESO INICIAL DE ADQUISICIÓN. RECOMENDACIONES</th>
            <th className="table-danger" style={{ width: "30% "}}>NO ADQUIRIDO. RECOMENDACIONES</th>
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
