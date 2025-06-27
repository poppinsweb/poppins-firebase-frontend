import { IoCheckmarkSharp } from "react-icons/io5";
import { useEvaluation } from "../../context/EvaluationProvider";

export const CardResultIndependence = () => {
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
    return <p>No independence responses found</p>;
  }

  const independenceCategories = [
    {
      name: "Para bañarse",
      response: evaluation.responses[0],
    },
    {
      name: "Para vestirse",
      response: evaluation.responses[1],
    },
    {
      name: "Para alimentarse",
      response: evaluation.responses[2],
    },
    {
      name: "Para dormir",
      response: evaluation.responses[3],
    },
  ];

  const renderDescriptions = (descriptions) => {
    if (!descriptions) return null;
    return descriptions
      .split("-")
      .map((item, index) => <div key={index}>- {item.trim()}</div>);
  };

  const renderCategoryRow = (category) => {
    const { response } = category;

    return (
      <tr key={category.name}>
        <td>{category.name}</td>
        <td className="table-primary">
          {response && response.optionId == 4 && <IoCheckmarkSharp />}
        </td>
        <td className="table-success">
          {response && response.optionId == 3 && <IoCheckmarkSharp />}
        </td>
        <td className="table-warning">
          {response && response.optionId == 2 && (
            <div>{renderDescriptions(response.answer)}</div>
          )}
        </td>
        <td className="table-danger">
          {response && response.optionId == 1 && (
            <div>{renderDescriptions(response.answer)}</div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="table-title">Independencia</h2>
      <table className="table table-hover results-container">
        <thead className="result-titles">
          <tr>
            <th className="th-width">INDEPENDENCIA</th>
            <th className="table-primary">INDEPENDIENTE</th>
            <th className="table-success">SEMI-INDEPENDIENTE</th>
            <th className="table-warning">SEMI-DEPENDIENTE</th>
            <th className="table-danger">DEPENDIENTE</th>
          </tr>
        </thead>
        <tbody className="result-titles">
          {independenceCategories.map((category) =>
            renderCategoryRow(category)
          )}
        </tbody>
      </table>
    </div>
  );
};
