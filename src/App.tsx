import { Container, Typography } from "@mui/material";
import Card from "./components/Card";

function App() {
  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Charts
        </Typography>
        <Card />
      </Container>
    </>
  );
}

export default App;
