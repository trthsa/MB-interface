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

const CreateFlightForm = () => {
  const [formData, setFormData] = useState({
    // id: 0,
    seats: 0,
    arrivalTime: "2023-04-30T06:42:16.962",
    statusId: 0,
    flightRouteID: 0,
    airLineId: 0,
    departureTime: "2023-04-30T06:42:16.962",
    timeFly: "1111",
    codeFlight: "",
  });
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
          body: JSON.stringify(formData),
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
    if (
      name === "arrivalTime" ||
      name === "departureTime" ||
      name === "timeFly"
    ) {
      const date = new Date(value);
      updatedValue = date.toISOString().slice(0, -8);
    }
    setFormData({ ...formData, [name]: updatedValue });
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
              value={formData.id}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              name="seats"
              label="Seats"
              fullWidth
              value={formData.seats}
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
              value={formData.arrivalTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="statusId"
              label="Status ID"
              fullWidth
              select
              value={formData.statusId}
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
              value={formData.flightRouteID}
              onChange={handleChange}
            >
              {flightRouteList.map((route) => (
                <MenuItem key={route.detail.id} value={route.detail.id}>
                  {route.detail.id} - {route.begin.name} {"=>"} {route.end.name}
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
              value={formData.airLineId}
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
              }}
              value={formData.departureTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="timeFly"
              label="Time Fly"
              fullWidth
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.timeFly}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="codeFlight"
              label="Code Flight"
              fullWidth
              value={formData.codeFlight}
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
