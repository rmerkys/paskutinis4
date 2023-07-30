import React from "react";
import { useState } from "react";

export default function Frontside({ data, fetchData }) {
  const [editId, setEditId] = useState(-1);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  function handleEdit(id) {
    setEditId(id);
  }

  async function handleUpdate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      surname: surname,
      emailAdress: email,
      age: age,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`http://localhost:4000/participants/${editId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setEditId(-1);
    fetchData();
  }
  async function handleDelete(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(`http://localhost:4000/participants/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchData();
  }

  console.log(data);

  const participants = Object.values(data).map((item) =>
    item._id === editId ? (
      <tr>
        <td>
          <input
            placeholder={item.name}
            style={{ fontSize: 14 }}
            className="editInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td>
          <input
            placeholder={item.surname}
            style={{ fontSize: 14 }}
            className="editInput"
            type="text"
            onChange={(e) => setSurname(e.target.value)}
          />
        </td>
        <td>
          <input
            placeholder={item.emailAdress}
            style={{ fontSize: 14 }}
            className="editInput"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </td>
        <td>
          <input
            placeholder={item.age}
            style={{ fontSize: 14 }}
            className="editInput"
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />
        </td>
        <td>
          <div className="tablediv">
            <button
              style={{ backgroundColor: "lightblue", color: "white" }}
              onClick={() => handleUpdate(item._id)}
            >
              Update
            </button>
            <button
              style={{ backgroundColor: "lightgrey", color: "white" }}
              onClick={() => setEditId(-1)}
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    ) : (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.surname}</td>
        <td>{item.emailAdress}</td>
        <td>{item.age}</td>
        <td>
          <div className="tablediv">
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </td>
      </tr>
    )
  );
  return (
    <div className="frontSideContainer">
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El. paštas</th>
            <th>Amžius</th>
            <th>Mygtukai</th>
          </tr>
        </thead>
        <tbody>
          {/* {Object.values(data).map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.emailAdress}</td>
                <td>{item.age}</td>
                <td>
                  <div className="tablediv">
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })} */}
          {participants}
        </tbody>
      </table>
    </div>
  );
}
