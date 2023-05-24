import { Box, Button, CircularProgress, Modal, TextField } from "@mui/material";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Flight } from "../../../components/interface/Flight";
import LoadingIcon from "../../../style/components/LoadingIcon";
import CreateFlightModal from "./components/CreateFlightModal";

interface IChosenFlight {
  name: string;
  value: string;
  flightID: string;
}

const fetchFlights = async () => {
  const response = await fetch("https://localhost:44379/api/Flight/GetAll");
  const data = await response.json();
  return data;
};

export default function FlightOverView() {
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
      <div className="px-20 pt-10">
        <h1 className="text-3xl font-bold mb-5">Flight Information</h1>
        <CreateFlightModal />
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <FlightsTable flights={flights} />
          </>
        )}
      </div>
    </>
  );
}

const FlightItemTable = ({
  flight,
  isScrolling,
  setChoosenAtribute,
}: {
  flight: Flight;
  isScrolling?: boolean;
  setChoosenAtribute: (value: string[]) => void;
}) => {
  // _.forEach(flight, (value, key) => {
  //   _.forEach(value, (value1, key1) => {
  //     console.log("Key:", key1);
  //     console.log("Value:", value1);
  //   });
  // });

  const ItemSpreader: React.FC<{
    value: any;
    name: string;
    //listener
    setChoosenAtribute?: (value: string[]) => void;
  }> = ({ value, name }) => {
    return (
      <tr
        onClick={() =>
          setChoosenAtribute && setChoosenAtribute([name || "", value || ""])
        }
        className="hover:bg-gray-100"
      >
        <td className="px-6 py-4 whitespace-nowrap font-bold">{name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{value}</td>
      </tr>
    );
  };
  const renderFlightItems = () => {
    const items: JSX.Element[] = [];
    _.forEach(flight, (value, key) => {
      _.forEach(value, (value1, key1) => {
        //TODO skip any key that have "Id" in it - case insensitive
        if (key1.toLowerCase().includes("id")) return;
        items.push(
          <ItemSpreader
            setChoosenAtribute={setChoosenAtribute}
            key={key1 + value1 + Math.random() * 1000}
            name={key1}
            value={value1}
          />
        );
      });
    });

    return items;
  };

  return (
    <div
      className={`max-w-5xl h-full mx-auto ${
        isScrolling && "overflow-scroll scrollbar-thin"
      }`}
    >
      <h2 className="text-3xl font-bold mb-5">Flight Details Information</h2>
      <table className=" divide-y divide-gray-200">
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
          {renderFlightItems()}
        </tbody>
        {/* <tbody className="bg-white divide-y divide-gray-200">
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
        </tbody> */}
      </table>
    </div>
  );
};

const FlightsTable = ({ flights }: { flights: Flight[] }) => {
  //TODO this will be the holder for what will be changed () state
  const [chosenAttributes, setChosenAttributes] = useState<string[]>(["", ""]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    //TODO clear chosen attributes
    setChosenAttributes(["", ""]);
  };
  const clickedFlight = useRef<Flight | null>(null);

  return (
    <>
      <div className={`bg-white shadow-md rounded my-6 overflow-auto`}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Flight ID
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Airline Name
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Flight Code
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Departure Time
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Arrival Time
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Flight Status
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Flight Route Distance
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr
                onClick={() => {
                  clickedFlight.current = flight;
                  handleOpen();
                }}
                key={flight.flights.id}
                className="hover:bg-gray-100 border-b cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.flights.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.airLine.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.flights.codeFlight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.flights.departureTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.flights.arrivalTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.status.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.route.distance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {flight.price.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          //make flex and justify center

          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid var(--primary-color)",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex h-full">
            <div className="overflow-auto h-full relative">
              <FlightItemTable
                setChoosenAtribute={setChosenAttributes}
                isScrolling
                flight={
                  flights.filter(
                    (flight) =>
                      flight.flights.id === clickedFlight.current?.flights.id
                  )[0]
                }
              />
            </div>
            <div className="w-[450px]">
              <div className="gray_box_style ml-5">
                <h1 className="gray_box_style text-xl font-bold">
                  Chọn thông tin cần thay đổi
                </h1>
                <div className="gray_box_style my-10">
                  <Box
                    sx={{ display: "flex", rowGap: 3, flexDirection: "column" }}
                  >
                    <Box sx={{ mb: 1 }}>
                      Bạn sẽ tiến hành thay đổi -
                      <span className="font-bold text-primary-color text-xl ml-2 mr-1 ">
                        {chosenAttributes[0]}
                      </span>{" "}
                    </Box>
                    <form
                    // onSubmit={handleSubmit}
                    >
                      <TextField
                        label={
                          chosenAttributes[0] === ""
                            ? "Hãy chọn thuộc tính cần đổi ở bảng bên trái"
                            : "Chọn thuộc tính"
                        }
                        placeholder="Hãy nhập giá trị mới"
                        disabled={chosenAttributes[0] === ""}
                        // value={inputValue}
                        onChange={(event) =>
                          setChosenAttributes([
                            chosenAttributes[0],
                            event.target.value,
                          ])
                        }
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 1,

                          //
                        }}
                        value={chosenAttributes[1]}
                      />
                    </form>
                    <Button
                      onAbort={() => {
                        //TODO set the attribute to the main flight

                        setChosenAttributes(["", ""]);
                      }}
                      type="submit"
                      variant="contained"
                    >
                      <CircularProgress /> Thay đổi
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
