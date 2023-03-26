import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function FormPage(props) {

  const [showLoading, setShowLoading] = useState(true);
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [learningRate, setLearningRate] = useState('');
  const [epoch, setEpoch] = useState('');
 
  const apiUrl = "http://localhost:3000/run";
 

  const handleSubmit = async (e) =>{ 
      e.preventDefault();
        
        //console.log("hererererre");
        setShowLoading(true);
        const info = {sepalLength, sepalWidth, petalLength, petalWidth, learningRate, epoch};
        //console.log("view "+ info);

        axios.post(apiUrl, info).then((result) => {
          //console.log("after post");
          window.alert(`data inserted successfully`)
          setPetalLength('');
          setPetalWidth('');
          setSepalLength('');
          setSepalWidth('');
          setLearningRate('');
          setEpoch('');
          setShowLoading(false);
          //console.log('results from save:',result.info)
          props.history.push("/home");
        }).catch((error) => setShowLoading(false));
  } 

  return (
    <div>  
      <Jumbotron>
              <Form >
                <Form.Group>
                  <Form.Label> sepal length </Form.Label>
                  <Form.Control type="text" name="sepalLength" id="sepalLength" placeholder="Enter sepal length " 
                                value={sepalLength} onChange={e => setSepalLength(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> sepal width </Form.Label>
                  <Form.Control type="text" name="sepalWidth" id="sepalWidth" placeholder="Enter sepal width"
                                value={sepalWidth} onChange={e => setSepalWidth(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> petal length </Form.Label>
                  <Form.Control type="text" name="petalLength" id="petalLength" placeholder="Enter petal length"
                                value={petalLength} onChange={e => setPetalLength(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> petal width </Form.Label>
                  <Form.Control type="text" name="petalWidth" id="petalWidth" placeholder="Enter petal width"
                                value={petalWidth} onChange={e => setPetalWidth(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> epoch </Form.Label>
                  <Form.Control type="text" name="epoch" id="epoch" placeholder="Enter epoch "
                                value={epoch} onChange={e => setEpoch(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> learningRate</Form.Label>
                  <Form.Control type="text" name="learningRate" id="learningRate" placeholder="Enter learning Rate"
                                value={learningRate} onChange={e => setLearningRate(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save
                </Button>
              </Form>
          </Jumbotron>
    </div>

  );
}
//
export default withRouter(FormPage);
