import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((res) => res.json())
        .then((data) => setState(data))
        .catch((err) => console.error(err));
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => setCity(data))
        .catch((err) => console.error(err));
    }
  }, [selectedState]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="wrapper">
        <select
          style={{ width: "300px" }}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value={""}>Select Country</option>
          {country.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          style={{ width: "150px" }}
          disabled={selectedCountry ? false : true}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value={""}>Select State</option>
          {state.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          style={{ width: "150px" }}
          disabled={selectedCountry && selectedState ? false : true}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value={""}>Select City</option>
          {city.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h3>
          You Selected <span style={{ fontSize: "30px" }}>{selectedCity}</span>, <span style={{ color: "#ccc" }}>{selectedState}, {selectedCountry}
          </span>
        </h3>
      )}
    </div>
  );
}

export default App;
