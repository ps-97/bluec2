import React, { useState, useEffect } from "react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import axios from "axios";

export default function SkillSelect({
  placeholder,
  isMulti,
  closeMenuOnSelect,
  onChange,
}) {
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.URL}/skills`)
      .then((response) =>
        response.data.map((skill) => ({ value: skill.id, label: skill.name }))
      )
      .then(setSkills);
  }, []);

  useEffect(() => {
    setGroupedSkills([
      {
        label: "skills",
        options: skills,
      },
    ]);
  }, [skills]);

  return (
    <Select
      id="skills"
      name="skills"
      options={groupedSkills}
      placeholder={placeholder}
      closeMenuOnSelect={closeMenuOnSelect}
      isMulti={isMulti}
      onChange={onChange}
    />
  );
}
