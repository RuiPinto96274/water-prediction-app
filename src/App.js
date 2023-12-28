import "./App.css";
import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [formValues, setFormValues] = useState({
    ph: "",
    hardness: "",
    solids: "",
    chloramines: "",
    sulfate: "",
    conductivity: "",
    organic_carbon: "",
    trihalomethanes: "",
    turbidity: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formValues, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }});
        setPredictionResult(response.data.prediction);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            pH:
            <input
              type="number"
              name="ph"
              value={formValues.ph}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            hardness:
            <input
              type="number"
              name="hardness"
              value={formValues.hardness}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            solids:
            <input
              type="number"
              name="solids"
              value={formValues.solids}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            chloramines:
            <input
              type="number"
              name="chloramines"
              value={formValues.chloramines}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            sulfate:
            <input
              type="number"
              name="sulfate"
              value={formValues.sulfate}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            conductivity:
            <input
              type="number"
              name="conductivity"
              value={formValues.conductivity}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            organic_carbon:
            <input
              type="number"
              name="organic_carbon"
              value={formValues.organic_carbon}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            trihalomethanes:
            <input
              type="number"
              name="trihalomethanes"
              value={formValues.trihalomethanes}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            turbidity:
            <input
              type="number"
              name="turbidity"
              value={formValues.turbidity}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
          {predictionResult !== null && (
          <div>
            {predictionResult === 1 ? (
              <h1>Water is safe to drink!</h1>
            ) : (
              <h1>Water is not safe to drink!</h1>
            )}
          </div>
          )}
      </header>
    </div>
  );
}

export default App;
