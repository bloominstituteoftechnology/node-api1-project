import React, { useState, useEffect } from "react";
import axios from "axios";

const List = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      })
      .catch((err) => {
        console.error("fail hard", err.message);
      });
  }, []);

  return (
    <div>
      <h2>Data</h2>
    </div>
  );
};

export default List;
