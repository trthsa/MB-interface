import { FlightData } from "./../Components/QuickSearchPanel/Booking/components/FlightSelectionPanel";
const sample_data = {
  flights: {
    id: 9,
    seats: 250,
    arrivalTime: "2023-05-15T11:42:16.962",
    statusId: 3,
    flightRouteID: 12,
    airLineId: 1,
    departureTime: "2023-05-18T10:30:16.962",
    timeFly: "2023-04-12T06:42:16.962",
    codeFlight: "VJ292",
  },
  status: {
    id: 3,
    name: "Sẵn sàng",
  },
  route: {
    id: 12,
    distance: "830km",
    flightTime: null,
  },
  price: {
    id: 9,
    price: 620000,
    flightID: 9,
    date: "2023-05-30T00:00:00",
  },
  airLine: {
    id: 1,
    name: "Vietnam Airlines ",
    logo: "string",
  },
  detail: {
    id: 7,
    flightRouteId: 12,
    beginAirPortId: 7,
    endAirPortId: 6,
  },
  begin: {
    id: 7,
    name: "Cam Ranh",
    location: "Khánh Hoà",
    iata: "CXR",
    gates: "18",
  },
  end: {
    id: 6,
    name: "Đà Nẵng ",
    location: "Đà Nẵng",
    iata: "DND",
    gates: "16",
  },
};

export type FlightDataType = typeof sample_data;
