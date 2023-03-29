import React from 'react';

function Pruebas(){
    const [tags, setTags] = React.useState([]);

    const addTag = () => {
      setTags([...tags, <p key={tags.length}>New Tag</p>]);
    }
  
    return (
      <div>
        <button onClick={addTag}>Add Tag</button>
        {tags.map(tag => tag)}
      </div>
    );
} export default Pruebas;