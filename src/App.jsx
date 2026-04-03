import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/login" element={<div>Login</div>}/>
          <Route path="/profile" element={<div>Profile</div>}/>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <Theme /> */}
    </>
  );
}

export default App;
