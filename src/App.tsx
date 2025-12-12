import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/TestBank/MISPortal_Build/">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
