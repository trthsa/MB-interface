import { useState } from "react";

import Home from "./S_components/Home";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <LoginViews /> */}
      <Home />
    </div>
  );
}

export default App;
