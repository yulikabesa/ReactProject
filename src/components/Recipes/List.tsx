const List: React.FC<{items: string[]}> = (props) => {
  return (
    <div>
      <ul>
        {props.items.map((item, index) => (
          <li key={index} style={{padding: '0.2rem', listStyleType: 'none', width: 'fit-content'}}>{index + 1}. {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
