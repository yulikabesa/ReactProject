import { useState } from "react";

const DynamicInput = (props) => {

  // Handle changes in an individual input field
  const handleChange = (index, event) => {
    const newFields = [...props.inputField];
    newFields[index].value = event.target.value;
    props.setInputField(newFields);
    // Add a new input field
    if (event.target.value.trim().length === 1 && +event.target.id.slice(-1) === props.inputField.length) {
      props.setInputField([...props.inputField, { value: "", id : Math.random().toString() }]);
    }
  };

  // remove the new field if empty
  const handleBlur = (index, event) => {
    if (event.target.value.length === 0 && index !== 0) {
      const newFields = [...props.inputField];
      newFields.splice(index, 1);
      props.setInputField(newFields);
    }
  };

  return (
    <div>
      {props.inputField.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.value}
            id={`${props.name} ${index + 1}`}
            placeholder={`${props.name} ${index + 1}`}
            onChange={(event) => handleChange(index, event)}
            onBlur={(event) => handleBlur(index, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicInput;
