const Validation = ({ render }) => {
  const validateForm = (formData) => {
    const { name, surname, emailAdress, age } = formData;

    const nameValid = name.length >= 3;

    const surnameValid = surname.length >= 4;

    const emailValid = emailAdress.includes("@");

    const ageValid = age >= 18;

    const formValid = nameValid && surnameValid && emailValid && ageValid;

    const errors = {
      nameValid,
      surnameValid,
      emailValid,
      ageValid,
    };

    return {
      formValid,
      errors,
    };
  };

  return render(validateForm);
};

export default Validation;
