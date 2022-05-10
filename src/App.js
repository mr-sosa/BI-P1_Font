import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {

  const URL = '';
  const [resp, setResp] = useState('');

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

  const checkSVM = async () => {
    var dataSend = {
      'study_and_condition': datos.study + ' . ' + datos.condition
    };

    const response = await fetch(URL+'/SVM', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }).then((respu) => respu.json())
    .then(() => {
      const clasificacion = response.clasificacion;
      if(clasificacion == '__label__1'){
        const exactitud = (response.prob1) * 100;
        setResp('Este paciente es elegible con ' + exactitud + '%  de confianza.');
      } else {
        const exactitud = (response.prob0) * 100;
        setResp('Este paciente NO es elegible con ' + exactitud + '%  de confianza.');
      }     
    });
  };

  const checkLR = async () => {
    var dataSend = {
      'study_and_condition': datos.study + ' . ' + datos.condition
    };

    const response = await fetch(URL+'/LR', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }).then((respu) => respu.json())    
    .then(() => {
      const clasificacion = response.clasificacion;
      if(clasificacion == '__label__1'){
        const exactitud = (response.prob1) * 100;
        setResp('Este paciente es elegible con ' + exactitud + '%  de confianza.');
      } else {
        const exactitud = (response.prob0) * 100;
        setResp('Este paciente NO es elegible con ' + exactitud + '%  de confianza.');
      }
    });
  };

  const checkMixed = async () => {
    var dataSend = {
      'study_and_condition': datos.study + ' . ' + datos.condition
    };

    const response = await fetch(URL+'/mixed', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }).then((respu) => respu.json())    
    .then(() => {
      const clasificacion = response.clasificacion;
      if(clasificacion == '__label__1'){
        const exactitud = (response.prob) * 100;
        setResp('Este paciente es elegible fueremente con ' + exactitud + '%  de confianza.');
      } else if(clasificacion == 'undet'){
        setResp('No es fuertemente recomendado.');
      } else {
        setResp('Este paciente NO es elegible.');
      }
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
              <li>Click one of the three buttons (Check SVM, Check LR or Check Mixed).</li>
            </ol>
            <p>Check SVM will use a Support Vector Classification.</p>
            <p>Check LR will use a Logistic Regression.</p>
            <p>Check Mixed will use a both types.</p>
          </div>
        </div>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Study
              </Form.Label>
              <input 
                type="textarea" 
                placeholder="Study"  
                className="form-control" 
                id="inlineFormInput"
                onChange={handleInputChange} 
                name="study"
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Condition
              </Form.Label>
              <input 
                type="textarea" 
                placeholder="Condition"  
                className="form-control" 
                id="inlineFormInput"
                onChange={handleInputChange} 
                name="condition"
              />
            </Col>
            <Col xs="auto">
              <Button className="mb-2" onClick={ () => { checkSVM() }}>
                Check SVM
              </Button>
            </Col>
            <Col xs="auto">
              <Button className="mb-2" onClick={ () => { checkLR() }}>
                Check LR
              </Button>
            </Col>
            <Col xs="auto">
              <Button className="mb-2" onClick={ () => { checkMixed() }}>
                Check Mixed 
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
