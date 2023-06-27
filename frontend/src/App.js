import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();

  const fetchData = () => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  };

  return (
    <div className="App">
      <span>Data: {data}</span>
      <br />
      <button onClick={fetchData}>Get Data</button>
    </div>
  );
}

export default App;
