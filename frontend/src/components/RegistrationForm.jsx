import React, { useState } from "react";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegistrationForm = ({ onSubmit, validateForm }) => {
  let initialFormData = {
    name: "",
    surname: "",
    emailAdress: "",
    age: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateForm(formData);

    if (validation.formValid) {
      onSubmit({ formData, validation });
      setFormData(initialFormData);
      setErrors(null);
    } else {
      setErrors(validation.errors);
    }
  };
  return (
    <form className="registrationForm" onSubmit={handleSubmit}>
      <label htmlFor="name">Vardas</label>
      {errors && !errors.nameValid && (
        <p className="errors" style={{ fontSize: 10 }}>
          * Vardas turi būti netrumpesnis nei 3 simboliai
        </p>
      )}
      <div className="nameInput">
        <FontAwesomeIcon icon={faUser} style={{ paddingLeft: 10 }} />
        <input
          type="text"
          name="name"
          placeholder="Vardas"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="surname">Pavardė</label>
      {errors && !errors.surnameValid && (
        <p className="errors" style={{ fontSize: 10 }}>
          * pavardė turi būti netrumpesnis nei 5 simboliai
        </p>
      )}
      <div className="surnameInput">
        <FontAwesomeIcon icon={faUser} style={{ paddingLeft: 10 }} />
        <input
          type="text"
          name="surname"
          placeholder="Pavardė"
          value={formData.surname}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="email">Elektroninis paštas</label>
      {errors && !errors.emailValid && (
        <p className="errors" style={{ fontSize: 10 }}>
          * Suklydote įvesdami savo elektroninį paštą formatas: abc@gmail.com
        </p>
      )}
      <div className="emailInput">
        <FontAwesomeIcon icon={faEnvelope} style={{ paddingLeft: 10 }} />
        <input
          type="email"
          name="emailAdress"
          id="emailAdress"
          placeholder="Elektroninis paštas (abc@gmail.com)"
          value={formData.emailAdress}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="age">Amžius</label>
      {errors && !errors.passwordValid && (
        <p className="errors" style={{ fontSize: 10 }}>
          * Dalyvis negali būti jaunesnis nei 18 metų
        </p>
      )}
      <div className="ageInput">
        <FontAwesomeIcon icon={faLock} style={{ paddingLeft: 10 }} />
        <input
          type="number"
          name="age"
          id="age"
          placeholder="Amžius"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Registruoti</button>
    </form>
  );
};

export default RegistrationForm;
