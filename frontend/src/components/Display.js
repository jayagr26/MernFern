import { Button } from "@mui/material";
import "../App.css";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

const Display = (props) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  return (
    <div className="display">
      <Card variant="outlined" className="display-card">
        <div className="display-card-content">
          {data.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
        <Button
          variant="contained"
          className="display-card-button"
          onClick={fetchData}
        >
          Fetch Data
        </Button>
      </Card>
    </div>
  );
};

export default Display;
