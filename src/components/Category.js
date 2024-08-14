

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Category = ({ category, onRemoveWidget }) => {
  return (
    <div>
      <ul className="list-group mb-3">
        {category.widgets.map(widget => (
          <li key={widget.id} className="list-group-item d-flex justify-content-between align-items-center">
            {widget.name}
            <button className="btn btn-danger btn-sm" onClick={() => onRemoveWidget(category.name, widget.id)}>Remove</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Category;
