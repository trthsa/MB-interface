import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchAirline,
  fetchFlightRoute,
  fetchStatus,
} from "../../../../api/apis";
import { AirLine } from "../../../../interface/AirLine";
import { FlightRoute } from "../../../../interface/FlightRoute";
import { Status } from "../../../../interface/Status";
import PopupModal from "./PopupModal";
//TODO this is a function to calculate the spread bewtween two date to return an hour number
function calculateHourSpread(date1: string, date2: string): number {
  const millisecondsDiff: number =
    new Date(date2).getTime() - new Date(date1).getTime();
  const hoursDiff: number = millisecondsDiff / (1000 * 60 * 60);
  return hoursDiff;
}

export default function CreateFlightModal() {
  return (
    <PopupModal buttonName="Tạo chuyến bay">
      <div className="min-w-[500px]">
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Tạo chuyến bay
        </Typography>
        <span className="text-slate-500">Đây là form tạo chuyến bay</span>
        <Divider />
        <div className="my-5">
          <CreateFlightForm />
        </div>
      </div>
    </PopupModal>
  );
}
const DateRawParser = (_date: string) => {
  const date = new Date(_date);
  let updatedValue = date.toISOString();
  return updatedValue;
};
const CreateFlightForm = () => {
  const [formData, setFormData] = useState({
    flight: {
      id: 0,
      seats: 0,
      arrivalTime: "2023-05-23T06:06:18.025Z",
      statusId: 1,
      flightRouteID: 17,
      airLineId: 1,
      departureTime: "2023-05-23T06:06:18.025Z",
      timeFly: "2023-05-23T06:06:18.025Z",
      codeFlight: "string",
    },
    price: {
      id: 0,
      price: 120000,
      flightID: 0,
      date: "2023-05-23T06:06:18.025Z",
    },
  });
  const b = {
    flight: {
      id: 0,
      seats: 0,
      arrivalTime: "2023-05-23T00:35:00.000Z",
      statusId: 1,
      flightRouteID: 1,
      airLineId: 2,
      departureTime: "2023-05-23T00:35:00.000Z",
      timeFly: "2023-05-23T06:06:18.025Z",
      codeFlight: "string",
    },
    price: {
      id: 0,
      price: 120000,
      flightID: 0,
      date: "2023-05-23T06:06:18.025Z",
    },
  };
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [flightRouteList, setFlightRouteList] = useState<FlightRoute[]>([]);
  const [airlineList, setAirlineList] = useState<AirLine[]>([]);

  //TODO fetcher
  useEffect(() => {
    const fetchData = async () => {
      // fetch status
      const statuses = fetchStatus();
      setStatusList(statuses);

      // fetch flight route
      const routes = await fetchFlightRoute();
      setFlightRouteList(routes);

      // fetch airline
      const airlines = await fetchAirline();
      setAirlineList(airlines);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:44379/api/Flight/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            ...formData,
            flight: {
              ...formData.flight,
              arrivalTime: DateRawParser(formData.flight.arrivalTime),
              departureTime: DateRawParser(formData.flight.departureTime),
              // flightRouteID: 17,
            },
          }),
        }
      );
      if (response.ok) {
        // Handle successful submission
        console.log("Form submitted successfully");
      } else {
        // Handle unsuccessful submission
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "arrivalTime" || name === "departureTime") {
      const date = new Date(value);
      updatedValue = date.toISOString().slice(0, -8);
    }
    //TODO calculate time fly = arrivalTime - departureTime

    setFormData({
      ...formData,
      flight: {
        ...formData.flight,
        [name]: updatedValue,
        // timeFly: calculateHourSpread(
        //   formData.flight.arrivalTime,
        //   formData.flight.departureTime
        // ).toString(),
      },
      //TODO calculate time fly = arrivalTime - departureTime in hours
      // timeFly: 0,
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <TextField
              name="id"
              label="ID"
              fullWidth
              value={formData.flight.id}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              name="seats"
              label="Seats"
              fullWidth
              value={formData.flight.seats}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="arrivalTime"
              label="Arrival Time"
              fullWidth
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.flight.arrivalTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="statusId"
              label="Status ID"
              fullWidth
              select
              value={formData.flight.statusId}
              onChange={handleChange}
            >
              {statusList.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="flightRouteID"
              label="Flight Route ID"
              fullWidth
              select
              value={formData.flight.flightRouteID}
              onChange={handleChange}
            >
              {flightRouteList.map((route) => (
                <MenuItem
                  key={route.detail.flightRouteId}
                  value={route.detail.flightRouteId}
                >
                  {route.detail.flightRouteId} - {route.begin.name} {"=>"}{" "}
                  {route.end.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="airLineId"
              label="Airline ID"
              fullWidth
              select
              value={formData.flight.airLineId}
              onChange={handleChange}
            >
              {airlineList.map((airline) => (
                <MenuItem key={airline.id} value={airline.id}>
                  {airline.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="departureTime"
              label="Departure Time"
              fullWidth
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
                //min date is arrival time
              }}
              value={formData.flight.departureTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="timeFly"
              label="Time Fly"
              disabled
              fullWidth
              // type="datetime-local"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.flight.timeFly}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="codeFlight"
              label="Code Flight"
              fullWidth
              value={formData.flight.codeFlight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Tạo chuyến bay
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
