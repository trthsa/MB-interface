import { useState } from "react";

import "./App.css";

import HomeView from "./views/HomeView";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HomeView />
    </div>
  );
}

export default App;
