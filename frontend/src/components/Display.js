import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import "../App.css";

const Display = (props) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  return (
    <div className="display">
      <Card variant="outlined" className="display-card">
        <Card
          variant="outlined"
          sx={{ width: "250px", height: "300px", margin: "20px" }}
        >
          <List>
            {data.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Card>

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
