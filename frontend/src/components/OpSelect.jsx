import React from "react";
import Select from "react-select";

const customStyle = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid white",
    cursor: "pointer",
    color: state.isFocused ? "#111E34" : "white",
    backgroundColor: state.isFocused ? "white" : "#111E34"
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none", // Remove a sombra padrão que pode conflitar
  }),
  input: (provided) => ({
    ...provided,
    color: "white", // Cor do texto ao digitar
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white", // Cor do valor selecionado
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#111E34", // Um fundo escuro para o menu dropdown
    left: 0
  }),
};

export default function OpSelect({ options, className, id, name, required, style = false }) {
  return (
    <Select
      options={options}
      className={className}
      styles={style ? style : customStyle}
      id={id}
      name={name}
      required={required}
    />
  );
}
