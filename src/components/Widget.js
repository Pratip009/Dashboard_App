import React from 'react';

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      <p>{widget.content}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Widget;