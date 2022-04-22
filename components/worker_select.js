import React, { useState, useEffect } from "react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import axios from "axios";

export default function WorkerSelect({
  placeholder,
  isMulti,
  closeMenuOnSelect,
  onChange,
  skillId,
}) {
  const [workers, setWorkers] = useState([]);
  const [groupedWorkers, setGroupedWorkers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.URL}/users?skill_id=${skillId}`, {headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}`}})
      .then((response) =>
        response.data.map((worker) => ({
          value: worker.id,
          label: worker.name,
        }))
      )
      .then(setWorkers);
  }, [skillId]);

  useEffect(() => {
    setGroupedWorkers([
      {
        label: "workers",
        options: workers,
      },
    ]);
  }, [workers]);

  return (
    <Select
      id="workers"
      name="workers"
      options={groupedWorkers}
      placeholder={placeholder}
      closeMenuOnSelect={closeMenuOnSelect}
      isMulti={isMulti}
      onChange={onChange}
    />
  );
}
