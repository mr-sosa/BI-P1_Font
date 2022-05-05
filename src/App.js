import React, { useState } from 'react';
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const urlFast = '';
  const urlStrong = '';

  const [study, setStudy] = useState('');
  const [condition, setCondition] = useState('');

  const fastCheck = () => {

  };

  const strongCheck = () => {

  };

  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Study"
                value={study}
                
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Username
              </Form.Label>
              <FormControl 
                className="mb-2" 
                id="inlineFormInputGroup" 
                placeholder="Condition" 
                value={condition}
                
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2" onClick={fastCheck()}>
                Fast Check
              </Button>
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2" onClick={strongCheck()}>
                Strong check
              </Button>
            </Col>
          </Row>
        </Form>
      </header>
    </div>
  );
}

export default App;
