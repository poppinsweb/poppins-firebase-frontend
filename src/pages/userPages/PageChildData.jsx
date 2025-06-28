import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchData } from "../../services/hooks/useFetchData";
import { useSubmitForm } from "../../services/hooks/useSubmitForm";
import umbrellafirst from "../../styles/images/UmbrellaFirst.jpg";
import "../../styles/users/userChild.css";

const PageChildData = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState([]);
  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_URL}/children`
  );
  const {
    submitForm,
    loading: submitting,
    error: submitError,
  } = useSubmitForm(`${import.meta.env.VITE_API_URL}/childrenres`);

  const location = useLocation();
  const navigate = useNavigate();

  const { evaluationtoken } = location.state || {};
  // console.log("en pagechild", evaluationtoken);

  useEffect(() => {
    if (data && data?.length > 0) {
      setOptions(data[0].categories);
    }
  }, [data]);

  const handleSelectedChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedChecks([...selectedChecks, value]);
    } else {
      setSelectedChecks(selectedChecks.filter((item) => item !== value));
    }
  };

  const validateForm = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      Object.values(selectedOptions).every(
        (option) => option !== "" && option !== 0
      )
    );
  };

  const checkIfUserExists = (firstName, lastName) => {
    if (!data) return false;
    return data.some(
      (child) =>
        child.firstName?.toLowerCase() === firstName.toLowerCase() &&
        child.lastName?.toLowerCase() === lastName.toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Por favor diligencie todos los campos");
      return;
    }

    const formData = {
      firstName,
      lastName,
      responses: selectedOptions,
      selectedChecks,
    };

    console.log("Form data to be submitted:", formData);

    try {
      setIsSubmitting(true);
      const userExists = checkIfUserExists(firstName, lastName);

      if (userExists) {
        if (
          !window.confirm(
            "El usuario ya existe. ¿Desea sobrescribir los datos?"
          )
        ) {
          setIsSubmitting(false);
          return;
        }
      }
      const data = await submitForm(formData, evaluationtoken);

      if (data) {
        console.log("Enviado...", data);
        alert("Enviado");
        // Limpia el formulario
        setFirstName("");
        setLastName("");
        setSelectedOptions({});
        setSelectedChecks([]);
        setIsChecked(false);
        navigate("/token");
      } else {
        console.error("Error submitting user responses:", submitError);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="user-container">
      <img
        src={umbrellafirst}
        className="logo2"
        alt="Logo paraguas"
      />
      <h2 className="user-title">Datos del Niño</h2>
      <div>Token Seleccionado: {evaluationtoken}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="user-label" htmlFor="firstName">
              <h3>Nombres</h3>
            </label>
          </div>
          <input
            type="text"
            className="user-input"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <div>
            <label className="user-label" htmlFor="lastName">
              <h3>Apellidos</h3>
            </label>
          </div>
          <input
            type="text"
            className="user-input"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {options.map((category) => {
            if (
              category.category === "Años de edad" ||
              category.category === "Meses"
            ) {
              return null; // Omitir estos campos de la lista de categorías
            }

            return (
              <div key={category._id}>
                <h3 className="user-label">{category.category}</h3>
                <select
                  className="user-select"
                  name={category.category}
                  value={selectedOptions[category.category] || ""}
                  onChange={(e) =>
                    handleSelectedChange(category.category, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  {category.options.map((option) => (
                    <option key={option._id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

          <div className="age-container">
            <div className="age-item">
              <label className="age-user-label" htmlFor="years">
                Edad del niño
              </label>
              <div className="age-user-select">
                <select
                  className="age-user-select"
                  id="years"
                  value={selectedOptions.years || ""}
                  onChange={(e) =>
                    handleSelectedChange("years", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Selecciona años
                  </option>
                  {[4, 5, 6, 7, 8, 9, 10].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="age-user-select"
                  id="months"
                  value={selectedOptions.months || ""}
                  onChange={(e) =>
                    handleSelectedChange("months", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Selecciona meses
                  </option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="adult-info">
            <label className="user-label" htmlFor="adult">
              Adulto que diligencia la encuesta:
            </label>
            <div className="user-checkbox">
              <label>
                <input
                  type="checkbox"
                  value="Mamá"
                  checked={selectedChecks.includes("Mamá")}
                  onChange={handleCheckboxChange}
                />{" "}
                Mamá
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Papá"
                  checked={selectedChecks.includes("Papá")}
                  onChange={handleCheckboxChange}
                />{" "}
                Papá
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Abuela/Abuelo"
                  checked={selectedChecks.includes("Abuela/Abuelo")}
                  onChange={handleCheckboxChange}
                />{" "}
                Abuela/Abuelo
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Tía/Tío"
                  checked={selectedChecks.includes("Tía/Tío")}
                  onChange={handleCheckboxChange}
                />{" "}
                Tía/Tío
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Niñera"
                  checked={selectedChecks.includes("Niñera")}
                  onChange={handleCheckboxChange}
                />{" "}
                Niñera
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Otros"
                  checked={selectedChecks.includes("Otros")}
                  onChange={handleCheckboxChange}
                />{" "}
                Otros
              </label>
            </div>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label className="form-check-label">
              Acepto la <a target="_blank" href="/privacity">política de tratamiento de datos personales</a> 
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-admin btn-color"
            disabled={
              !validateForm() || isSubmitting || submitting || !isChecked
            }
          >
            {isSubmitting || submitting ? "Enviando..." : "Enviar"}
          </button>
          {submitError && <p>Error submitting data: {submitError.message}</p>}
        </form>
      </div>
    </div>
  );
};
export default PageChildData;
