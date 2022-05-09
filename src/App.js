import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const urlFast = '';
  const urlStrong = '';

  const [datos, setDatos] = useState({
    study: '',
    condition: ''
  })

  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const [resp, setResp] = useState('');

  const fastCheck = async () => {
    var dataSend = {
      'study_and_condition': datos.study + ' . ' + datos.condition
    };

    const response = await fetch(urlFast, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }).then((respu) => respu.json())
    .then(() => {
      const exactitud = (response.exactitud) * 100;
      setResp(exactitud.toString + '%')
    });
  };

  const strongCheck = async () => {
    var dataSend = {
      'study_and_condition': datos.study + ' . ' + datos.condition
    };

    const response = await fetch(urlStrong, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }).then((respu) => respu.json())    
    .then(() => {
      const exactitud = (response.exactitud) * 100;
      setResp(exactitud.toString + '%')
    });
  };

  

  return (
    <div className="App">
      <header className="App-header">
        <div className='tittle'>
          <h1>Welcome doctor</h1>
          <h3>Instructions:</h3>
          <div className='instructions'>
            <ol>
              <li>Put a study.</li>
              <li>Put a condition.</li>
              <li>Click one of the two buttons (Fast Check or Strong Check).</li>
            </ol>
            <p>Fast check will use a ...</p>
            <p>Strong check will use a ...</p>
          </div>
        </div>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Name
              </Form.Label>
              <input 
                type="text" 
                placeholder="Study"  
                className="form-control mb-2" 
                id="inlineFormInput"
                onChange={handleInputChange} 
                name="study"
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Username
              </Form.Label>
              <input 
                type="text" 
                placeholder="Condition"  
                className="form-control mb-2" 
                id="inlineFormInput"
                onChange={handleInputChange} 
                name="condition"
              />
            </Col>
            <Col xs="auto">
              <Button className="mb-2" onClick={ ()=>{setResp('fastCheck'+datos.study);fastCheck();}}>
                Fast Check
              </Button>
            </Col>
            <Col xs="auto">
              <Button className="mb-2" onClick={()=>{setResp('strongCheck'+datos.condition);strongCheck();}}>
                Strong check
              </Button>
            </Col>
          </Row>
        </Form>
        <div className='resp'>
          <h3>Response</h3>
          <pre id='resp-data'>{resp}</pre>
        </div>        
      </header>
    </div>
  );
}

export default App;
