import { useState } from "react";

import "./App.css";

import QuickSearchPanel from "./components/QuickSearchPanel";
import HomeView from "./views/HomeView";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <HomeView />
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          defaultValue={[dayjs("2022-04-17T15:30"), dayjs("2022-04-21T18:30")]}
          //make this also pick the date and time
          //   renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
      <div
        // style={{
        //   backgroundImage:
        //     "url(https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/web1920x960-topbannervnmin-1675829371241.jpg) no-repeat center center fixed",
        // }}
        className="relative flex justify-end px-32 my-20 h-full"
      >
        <img
          className="absolute -top-20  left-0 w-full h-full object-cover"
          src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/web1920x960-topbannervnmin-1675829371241.jpg"
          alt=""
        />
        <div className="z-10">
          <QuickSearchPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
