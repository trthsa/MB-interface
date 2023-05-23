import { Flight } from "./../Components/interface/Flight";
import { AirLine } from "../interface/AirLine";
import { FlightRoute } from "../interface/FlightRoute";
import { Status, sample_data } from "../interface/Status";
import { FlightDataType } from "../interface/FlightData";

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

//TODO fetch a Flight
const fetchFlight = async (id: string) => {
  const raw_data = await fetch(`https://localhost:44379/api/Flight/Get/${id}`, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });
  const data = await raw_data.json();
  return data as FlightDataType;
};
export { fetchStatus, fetchFlightRoute, fetchAirline, fetchFlight };
