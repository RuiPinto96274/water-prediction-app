import "./App.css";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, NumberInput } from "@mantine/core";
import axios from "axios";
import { Github } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function App() {
  const form = useForm({
    initialValues: {
      ph: "8",
      hardness: "200",
      solids: "8700",
      chloramines: "8",
      sulfate: "350",
      conductivity: "338",
      organic_carbon: "18",
      trihalomethanes: "105",
      turbidity: "3",
    },
    validate: {
      ph: (value) =>
        value >= 0 && value <= 14 && value !== ""
          ? null
          : "ph must be between 0 and 14",
      hardness: (value) =>
        value >= 47 && value <= 320 && value !== ""
          ? null
          : "hardness must be between 47 and 320 mg/L",
      solids: (value) =>
        value > 720 && value <= 61220 && value !== ""
          ? null
          : "solids must be between 720 and 61220 ppm",
      chloramines: (value) =>
        value >= 0 && value <= 13 && value !== ""
          ? null
          : "chloramines must be between 0 and 13 ppm",
      sulfate: (value) =>
        value >= 180 && value <= 481 && value !== ""
          ? null
          : "sulfate must be between 180 and 481 mg/L",
      conductivity: (value) =>
        value >= 210 && value <= 753 && value !== ""
          ? null
          : "conductivity must be between 210 and 753 μS/cm",
      organic_carbon: (value) =>
        value >= 2 && value <= 28 && value !== ""
          ? null
          : "organic carbon must be between 2 and 28 mg/L",
      trihalomethanes: (value) =>
        value >= 8 && value <= 124 && value !== ""
          ? null
          : "trihalomethanes must be between 8 and 124 ppm",
      turbidity: (value) =>
        value >= 1 && value <= 7 && value !== ""
          ? null
          : "turbidity must be between 1 and 7 NTU",
    },
  });

  const [predictionResult, setPredictionResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    form.validate();
    if (!form.isValid()) {
      console.error("Form is not valid");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://backend-flask.up.railway.app/predict",
          { ...form.values },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setPredictionResult(response.data.prediction);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      Go to github repository
    </Tooltip>
  );

  return (
    <div className="App">
      <main className="App-main">
        <div className="box">
          <form onSubmit={form.onSubmit(console.log)}>
            <NumberInput
              label="Ph"
              placeholder="ph"
              min={0}
              max={14}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("ph")}
            />
            <NumberInput
              label="Hardness"
              placeholder="hardness"
              min={47}
              max={320}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("hardness")}
            />
            <NumberInput
              label="Solids"
              placeholder="solids"
              min={720}
              max={61220}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("solids")}
            />
            <NumberInput
              label="Chloramines"
              placeholder="chloramines"
              min={0}
              max={13}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("chloramines")}
            />
            <NumberInput
              label="Sulfate"
              placeholder="sulfate"
              min={180}
              max={481}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("sulfate")}
            />
            <NumberInput
              label="Conductivity"
              placeholder="conductivity"
              min={210}
              max={753}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("conductivity")}
            />
            <NumberInput
              label="Organic Carbon"
              placeholder="organic carbon"
              min={2}
              max={28}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("organic_carbon")}
            />
            <NumberInput
              label="Trihalomethanes"
              placeholder="trihalomethanes"
              min={8}
              max={124}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("trihalomethanes")}
            />
            <NumberInput
              label="Turbidity"
              placeholder="turbidity"
              min={1}
              max={7}
              decimalScale={2}
              hideControls
              required
              {...form.getInputProps("turbidity")}
            />
            <Button type="submit" onClick={handleSubmit} className="predictBtn">
              Predict
            </Button>
          </form>
          {predictionResult !== null && (
            <div>
              {predictionResult === 1 ? (
                <h1 id="safe">Water is safe to drink!</h1>
              ) : (
                <h1 id="notsafe">Don't drink it!</h1>
              )}
            </div>
          )}
        </div>
        <div className="btnContainer">
          <OverlayTrigger
            placement="left"
            delay={{ show: 200, hide: 200 }}
            overlay={renderTooltip}
          >
            <a
              className="socialBtn"
              href="https://github.com/RuiPinto96274/backend-flask"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="iconSocial" />
            </a>
          </OverlayTrigger>
        </div>
      </main>
    </div>
  );
}

export default App;
