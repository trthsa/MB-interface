const sample_data = [
  {
    route: {
      id: 17,
      distance: "1700km",
      flightTime: null,
    },
    detail: {
      id: 1,
      flightRouteId: 17,
      beginAirPortId: 1,
      endAirPortId: 5,
    },
    begin: {
      id: 1,
      name: "Tân Sơn Nhất",
      location: "Thành phố Hồ Chí Minh",
      iata: "SGN",
      gates: "68",
    },
    end: {
      id: 5,
      name: "Nội Bài",
      location: "Hà Nội ",
      iata: "HAN",
      gates: "66",
    },
  },
];
export type FlightRoute = (typeof sample_data)[0];
