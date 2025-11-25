import { Fragment } from "react/jsx-runtime";
import { ChangeEvent, FocusEvent  } from "react";

const DynamicInput: React.FC<{setInputField: (values: string[]) => void ; inputField: string[] ; name: string}> = (props) => {
  // Handle changes in an individual input field
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newFields = [...props.inputField];
    newFields[index] = event.target.value;
    props.setInputField(newFields);
    // Add a new input field
    if (
      event.target.value.trim().length === 1 &&
      index+1 === props.inputField.length
    ) {
      props.setInputField([...newFields, ""]);
    }
  };

  // remove the new field if empty
  const handleBlur = (index: number, event: FocusEvent<HTMLInputElement>) => {
    if (
      event.target.value.trim() === "" &&
      index !== +props.inputField.length - 1
    ) {
      const newFields = [...props.inputField];
      newFields.splice(index, 1);
      props.setInputField(newFields);
    }
  };

  const style = {fontWeight: 'bold'};

  return (
    <Fragment>
      <p style={style}>
        {props.name + 's'}
      </p>
      <div>
        {props.inputField.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              id={Math.random().toString()}
              value={field}
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
