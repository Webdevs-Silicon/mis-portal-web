import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <div
        style={{
          maxWidth: "430px", // iphone screen
          // margin: "0 auto",
          // background: "#fc1d1dff",
          minHeight: "100vh",
        }}
      > */}
      <AppRoutes />
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
