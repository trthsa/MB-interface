import { useState } from "react";

import LoginViews from "./views/LoginViews";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <LoginViews />
    </div>
  );
}

export default App;
