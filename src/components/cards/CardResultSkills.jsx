import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useEvaluation } from "../../context/EvaluationProvider";

export const CardResultSkills = () => {
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
    return <p>No skills responses found</p>;
  }

  const skillCategories = [
    {
      name: "Habilidades de aseo personal",
      skillNames: [
        "Secarse el cuerpo después del baño",
        "Peinarse el cabello",
        "Limpiarse la nariz",
        "Limpiarse después de ir al baño",
        "Lavarse las manos al salir del baño",
        "Cepillarse los dientes solo",
        "Controlar esfínteres durante el día",
        "Controlar esfínteres durante la noche",
        "Soltar el baño luego de usarlo",
      ],
      questionIds: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    {
      name: "Habilidades del vestido",
      skillNames: [
        "Abotonarse",
        "Amarrarse los cordones",
        "Ponerse las medias",
        "Ponerse los zapatos",
        "Subir y bajar cremalleras",
      ],
      questionIds: [14, 15, 16, 17, 18],
    },
    {
      name: "Habilidades de la alimentación",
      skillNames: [
        "Utilizar la cuchara",
        "Utilizar el tenedor",
        "Utilizar el cuchillo",
      ],
      questionIds: [19, 20, 21],
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
          {/* Solo renderiza si NO hay optionId 1 o 2 */}
          {hasOptionId4 && !hasOptionId3 && !hasOption1or2 && (
            <IoCheckmarkSharp />
          )}
        </td>
        <td className="table-success">
          {/* Solo renderiza si NO hay optionId 1 o 2 */}
          {hasOptionId3 && !hasOption1or2 && <IoCheckmarkSharp />}
        </td>
        <td className="table-warning">
          {groupedDescriptions[2].length > 0 && (
            <div>
              {groupedDescriptions[2].map((description, index) => (
                <div key={index}>{renderDescriptions(description)}</div>
              ))}
            </div>
          )}
        </td>
        <td className="table-danger">
          {groupedDescriptions[1].length > 0 && (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {groupedDescriptions[1].map((description, index) => (
                <div key={index}>{renderDescriptions(description)}</div>
              ))}
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="table-title">Habilidades</h2>
      <table className="table table-hover results-container">
        <thead className="result-titles">
          <tr>
            <th>HABILIDADES</th>
            <th className="table-primary">CON HABILIDAD</th>
            <th className="table-success">
              EN PROCESO AVANZADO DE APRENDIZAJE
            </th>
            <th className="table-warning">EN PROCESO INICIAL DE APRENDIZAJE</th>
            <th className="table-danger">NO LO HA INTENTADO</th>
          </tr>
        </thead>
        <tbody className="result-titles">
          {skillCategories.map((category) => renderCategoryRow(category))}
        </tbody>
      </table>
    </div>
  );
};

export default CardResultSkills;
