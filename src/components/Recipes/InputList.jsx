const InputList = (props) => {
  return (
    <div>
      <ul>
        {props.items.map((item, index) => (
          <li key={index} style={{padding: '0.5rem', listStyleType: 'none', width: 'fit-content'}}>{index + 1}. {item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputList;
