import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Validation from "./Validation";

export default function RightSide({ fetchData }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async ({ formData, validation }) => {
    if (validation.formValid) {
      let data = Object.values(formData);

      await fetch("http://localhost:4000/participants/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      console.log(JSON.stringify(data));
      fetchData();
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };
  return (
    <div className="rightSideContainer">
      <h1>Registracijos forma</h1>
      <Validation
        render={(validateForm) => (
          <RegistrationForm
            onSubmit={handleFormSubmit}
            validateForm={validateForm}
            formSubmitted={formSubmitted}
          />
        )}
      />
    </div>
  );
}
