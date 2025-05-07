import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layout/RootLayout";
import { Dardboard } from "./pages/Dardboard";
import { SensorData } from "./pages/SensorData";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Dardboard />}></Route>
          <Route path="/history" element={<History />} />
          <Route path="/sensordata" element={<SensorData />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
