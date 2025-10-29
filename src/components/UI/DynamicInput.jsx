import { Fragment } from "react/jsx-runtime";

const DynamicInput = (props) => {
  // Handle changes in an individual input field
  const handleChange = (index, event) => {
    const newFields = [...props.inputField];
    newFields[index] = event.target.value;
    props.setInputField(newFields);
    // Add a new input field
    if (
      event.target.value.trim().length === 1 &&
      +event.target.id.slice(-1) === props.inputField.length
    ) {
      props.setInputField([...newFields, ""]);
    }
  };

  // remove the new field if empty
  const handleBlur = (index, event) => {
    if (
      event.target.value.trim() === "" &&
      index !== +props.inputField.length - 1
    ) {
      const newFields = [...props.inputField];
      newFields.splice(index, 1);
      props.setInputField(newFields);
    }
  };

  return (
    <Fragment>
      <p style={{fontWeight: 'bold'}}>
        {props.name}
      </p>
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
    </Fragment>
  );
};

export default DynamicInput;
