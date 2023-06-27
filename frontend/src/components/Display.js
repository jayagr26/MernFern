import { Button } from "@mui/material";
import "../App.css";
import Card from "@mui/material/Card";

const Display = (props) => {
  return (
    <div className="display">
      <Card variant="outlined" className="display-card">
        <div className="display-card-content">{props.content}</div>
        <Button variant="contained" className="display-card-button">
          Fetch Data
        </Button>
      </Card>
    </div>
  );
};

export default Display;
