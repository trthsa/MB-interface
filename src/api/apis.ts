import { AirLine } from "../interface/AirLine";
import { FlightRoute } from "../interface/FlightRoute";
import { Status, sample_data } from "../interface/Status";

//TODO get status from server
const fetchStatus = (): Status[] => {
  return sample_data;
};
//TODO get flight route from server
const fetchFlightRoute = async () => {
  // curl -X GET "https://localhost:44379/api/FlightRoute/GetAll" -H  "accept: */*"
  const raw_data = await fetch(
    "https://localhost:44379/api/FlightRoute/GetAll",
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );
  const data = await raw_data.json();
  return data as FlightRoute[];
};
//TODO get airline from server
const fetchAirline = async () => {
  const raw_data = await fetch("https://localhost:44379/api/AirLine/GetAll", {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });
  const data = await raw_data.json();
  return data as AirLine[];
};

export { fetchStatus, fetchFlightRoute, fetchAirline };
