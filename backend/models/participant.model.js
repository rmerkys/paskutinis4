class Participant {
  name;
  surname;
  emailAdress;
  age;

  constructor(name, surname, emailAdress, age) {
    this.name = name;
    this.surname = surname;
    this.emailAdress = emailAdress;
    this.age = age;
  }
}

module.exports = Participant;
