import React from "react";
import { useLocation } from "react-router-dom";
import { useChild } from "../../context/ChildProvider";
import { CardResultIndependence } from "../../components/cards/CardResultIndependence.jsx";
import { CardResultSkills } from "../../components/cards/CardResultSkills.jsx";
import { CardResultHabits } from "../../components/cards/CardResultHabits.jsx";
import umbrella from "../../styles/images/UmbrellaFirst.jpg";
import html2pdf from "html2pdf.js";
import "../../styles/users/result.css";

const EvaluationResultPage = () => {
  const {
    data: childrenData,
    loading: childrenLoading,
    error: childrenError,
  } = useChild();

  const location = useLocation();
  const { evaluationtoken } = location.state || {};

  if (childrenLoading) return <p>Loading...</p>;
  if (childrenError)
    return <p>Error loading children data: {childrenError.message}</p>;

  const responses = childrenData?.responses || [];

  const fechaParte = childrenData?.createdAt?.slice(0, 10);
  const [year, month, day] = fechaParte?.split("-");
  const fechaAplicacion = `${day}-${month}-${year}`;

  const sexo = responses[0]?.value || "N/A";
  const nivelEscolar = responses[3]?.value || "N/A";
  const aniosEdad = responses[4]?.value || "N/A";
  const mesesEdad = responses[5]?.value || "N/A";
  const { firstName, lastName } = childrenData || {};

   const handleDownloadPdf = () => {
    const element = document.getElementById("pdf-content");
    html2pdf()
      .set({
        margin: 1, // pulgadas (~2.54cm)
        filename: "poppinsEduca_resultados.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <>
      <div id="pdf-content">
        <div className="header-result-title">
          <img className="img-result" src={umbrella} alt="logo Poppins" />
          <h1 className="main-title main-title-one">
            Evaluación de hábitos e independencia en la rutina diaria
          </h1>
        </div>
        <div>
          <div className="header-container1">
            <table className="table table-borderless ">
              <tbody>
                <tr>
                  <th>
                    <strong>Nombre:</strong>
                  </th>
                  <th>
                    <strong>Edad:</strong>
                  </th>
                  <th>
                    <strong>Sexo:</strong>
                  </th>
                  <th>
                    <strong>Grado:</strong>
                  </th>
                  <th>
                    <strong>Fecha:</strong>
                  </th>
                </tr>
                <tr>
                  <td>{firstName + " " + lastName}</td>
                  <td>
                    {aniosEdad} años - {mesesEdad} meses
                  </td>
                  <td>{sexo}</td>
                  <td>{nivelEscolar}</td>
                  <td>{fechaAplicacion}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="result-table-container">
          <CardResultIndependence />
          <CardResultSkills />
          <CardResultHabits />
        </div>
      </div>
      <button className="btn-color btn-color-result" onClick={handleDownloadPdf}>
        Descargar PDF
      </button>
    </>
  );
};

export default EvaluationResultPage;
