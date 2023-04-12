import { useEffect, useState } from "react";

const fetchFlights = async () => {
  const response = await fetch("https://localhost:44379/api/Flight/GetAll");
  const data = await response.json();
  return data;
};

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

type Flight = typeof sampleFlight;

export default function FlightView() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //TODO fetch data
    setIsLoading(true);
    fetchFlights().then((data) => {
      setFlights(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {flights.map((flight, index) => {
              return (
                <div key={index}>
                  {/* <div>{flight.flights.codeFlight}</div> */}
                  <FlightTable flight={flight} />
                </div>
              );
            })}                   
          </>
        )}
      </div>
    </>
  );
}

const FlightTable = ({ flight }: { flight: Flight }) => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-5">Flight Information</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Property
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Flight ID</td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.flights.id}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Seats</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.seats}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Arrival Time
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.arrivalTime}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Status ID</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.statusId}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Flight Route ID
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.flightRouteID}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Airline ID
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.airLineId}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Departure Time
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.departureTime}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Time Fly</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.timeFly}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Code Flight
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.flights.codeFlight}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Status Name
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.status.name}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Route Distance
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.route.distance}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Route Flight Time
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.route.flightTime}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Price ID</td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.price.id}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Price</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.price.price}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Flight ID (Price)
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.price.flightID}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Price Date
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.price.date}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Airline Name
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.airLine.name}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Airline Logo
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.airLine.logo}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Detail ID</td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.detail.id}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Flight Route ID (Detail)
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.detail.flightRouteId}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Begin Airport ID
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.detail.beginAirPortId}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              End Airport ID
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.detail.endAirPortId}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Begin Airport Name
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.begin.name}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Begin Airport Location
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.begin.location}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Begin Airport IATA
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.begin.iata}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              Begin Airport Gates
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.begin.gates}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              End Airport Name
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.end.name}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              End Airport Location
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flight.end.location}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              End Airport IATA
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.end.iata}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">
              End Airport Gates
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{flight.end.gates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
