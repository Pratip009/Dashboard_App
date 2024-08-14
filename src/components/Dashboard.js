import React, { useState } from 'react';
import { dashboardData } from '../dashboardData';
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [categories, setCategories] = useState(dashboardData.categories);
  const [searchTerm, setSearchTerm] = useState('');

  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetDescription, setNewWidgetDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShow = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const addWidget = () => {
    if (newWidgetName && newWidgetDescription && selectedCategory) {
      const newWidget = { 
        id: new Date().getTime(), 
        name: newWidgetName, 
        description: newWidgetDescription 
      };

      setCategories(categories.map(category => {
        if (category.name === selectedCategory) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget]
          };
        }
        return category;
      }));

      setNewWidgetName('');
      setNewWidgetDescription('');
      setSelectedCategory('');
      handleClose();
    }
  };

  const removeWidget = (categoryName, widgetId) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    }));
  };

  const addCategory = () => {
    if (newCategoryName) {
      if (!categories.find(category => category.name === newCategoryName)) {
        setCategories([...categories, { name: newCategoryName, widgets: [] }]);
      } else {
        alert('Category already exists.');
      }

      setNewCategoryName('');
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => widget.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }));

  const isAddWidgetButtonDisabled = !newWidgetName || !newWidgetDescription || !selectedCategory;

  return (
    <div className="container mt-4">
      <input 
        type="text" 
        className="form-control mb-4" 
        placeholder="Search Widgets" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      
      <div className="mb-4">
        <h4>Add New Category</h4>
        <div className="form-group mb-2">
          <label htmlFor="categoryName">Category Name</label>
          <input 
            type="text" 
            id="categoryName" 
            className="form-control" 
            placeholder="Category Name" 
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)} 
          />
        </div>
        <Button 
          variant="primary" 
          onClick={addCategory}
        >
          Add Category
        </Button>
      </div>

   
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formWidgetName">
              <Form.Label>Widget Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Widget Name" 
                value={newWidgetName} 
                onChange={(e) => setNewWidgetName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWidgetDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Widget Description" 
                value={newWidgetDescription} 
                onChange={(e) => setNewWidgetDescription(e.target.value)} 
              />
            </Form.Group>
            <Button 
              variant="primary" 
              onClick={addWidget}
              disabled={isAddWidgetButtonDisabled}
            >
              Add Widget
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="row">
        {filteredCategories.map(category => (
          <div key={category.name} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <Button 
                  variant="primary" 
                  onClick={() => handleShow(category.name)}
                  className="mb-3"
                >
                  Add Widget
                </Button>
                <Category 
                  category={category} 
                  onRemoveWidget={removeWidget}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
