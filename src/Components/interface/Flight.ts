const sampleFlight = {
  flights: {
    id: 1,
    seats: 300,
    arrivalTime: "2023-05-18T17:21:53.204",
    statusId: 3,
    flightRouteID: 7,
    airLineId: 1,
    departureTime: "2023-05-18T18:22:53.204",
    timeFly: "2023-04-04T18:21:53.204",
    codeFlight: "vl2021",
  },
  status: {
    id: 3,
    name: "Sẵn sàng",
  },
  route: {
    id: 7,
    distance: "300km",
    flightTime: "string",
  },
  price: {
    id: 1,
    price: 590000,
    flightID: 1,
    date: "2023-05-18T03:25:57.53",
  },
  airLine: {
    id: 1,
    name: "Vietnam Airlines ",
    logo: "string",
  },
  detail: {
    id: 10,
    flightRouteId: 7,
    beginAirPortId: 10,
    endAirPortId: 5,
  },
  begin: {
    id: 10,
    name: "Vân Đồn",
    location: "Quảng Ninh",
    iata: "VDO",
    gates: "1",
  },
  end: {
    id: 5,
    name: "Nội Bài",
    location: "Hà Nội ",
    iata: "HAN",
    gates: "66",
  },
};

const sampleFlightRoute = {
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
};
const sampleInvoice = {
  invoice: {
    id: 2,
    paymentDate: "2023-04-06T10:13:24.9008287",
    amount: 2000000,
    paymentStatus: "Đã thanh toán",
    bookingId: 0,
    customerName: "Nguyễn Thị",
    revenueID: 0,
    idAdmin: 0,
    idTicket: 26,
  },
  ticket: {
    id: 26,
    dateTime: "2023-04-06T03:12:23.708",
    ticketclassId: 1,
    paymentMethods: "string",
    flightID: 1,
    voucherID: 1,
    codeSeats: "string",
    tempId: 30,
  },
  tempcustomer: {
    id: 30,
    phone: "string",
    email: "string",
    nationCCIDID: 1,
  },
  nation: {
    id: 1,
    firstName: " Hồng Nga",
    lastName: "Nguyễn Thị",
    dob: "10/02/1995",
    address: "123 Đường số 5, phường Tân Phú, quận 7, TP.HCM.",
    area: null,
  },
};
const sampleUser = {
  id: 1,
  email: "Phong@gmail.com",
  userName: "phong",
};
export type Flight = typeof sampleFlight;
export type FlightRoute = typeof sampleFlightRoute;
export type Invoice = typeof sampleInvoice;
export type User = typeof sampleUser;
