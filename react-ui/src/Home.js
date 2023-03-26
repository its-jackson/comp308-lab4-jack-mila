import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//

function Home(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [learningRate, setLearningRate] = useState('');
  const [epoch, setEpoch] = useState('');
  var firstTimeLoading = true;
  const apiUrl = "http://localhost:3000/run";
 

  useEffect(() => {
    console.log("useeffect");
    
      const fetchData = async () => {
        console.log("fetch");
        axios.get(apiUrl)
          .then(result => {
            console.log('result.data:',result.data)
            setData(result.data)
            setShowLoading(false)
          }).catch((error) => {
            console.log('error in fetchData:', error)
          });
        };  
      fetchData();
  }, []);


  const handleEnter = async (e) =>{ 
    props.history.push("/");
  }


  return (
    <div>
      { showLoading === false
        ? <div>
            {showLoading && <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> }
              
            <h1>Prediction Results</h1>
            <h2> the values for species will be:</h2>
            <li>setosa: 1,0,0</li> 
            <li>virginica: 0,1,0</li>
            <li>versicolor: 0,0,1 </li>

            <table className="App-table">
              <thead>
                <tr>
                  <th>Test</th>
                  
                </tr>
              </thead>
              
              <tbody>
                
                <tr>
                  <td className="App-td">
                    { 
                     data.row.map((value, index) => (
                      <p key={index}>{value}</p>
                    ))}
                  </td>

                </tr>
              </tbody>
            </table> 
          </div>
        : 
        < div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner> }
        </div>
      }
      <Button variant="primary" type="submit" onClick={handleEnter}>
                  enter data
      </Button>
    </div>

  );
}
//
export default withRouter(Home);
