import React from "react";
import { useState, useEffect } from "react";
import RightSide from "./RightSide";
import Frontside from "./FrontSid";

export default function Container() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch("http://localhost:4000/participants/", requestOptions)
      .then((response) => response.text())
      .then((result) => setData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="combined">
      <RightSide fetchData={fetchData} />
      <Frontside data={data} fetchData={fetchData} />
    </div>
  );
}
