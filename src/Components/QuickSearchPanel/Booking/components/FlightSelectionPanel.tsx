import DoneAllIcon from "@mui/icons-material/DoneAll";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { StepProps } from "..";

export function createData(
  id: string,
  hang: string,
  giocatcanh: string,
  giohacanh: string,
  thoiGianBay: string,
  Gia: string
) {
  return {
    id,
    hang,
    giocatcanh,
    giohacanh,
    thoiGianBay,
    Gia,
  };
}
export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);

  const year = date.getFullYear().toString().slice(2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export type FlightData = ReturnType<typeof createData>;
const rows = [
  createData(
    "1",
    "VietNam Air",
    "Hồ Chí Minh - 10:00 AM",
    "Hà Nội - 6:00 PM",
    "3 giờ 5 phút",
    "1.600.000 VNĐ (1 người)"
  ),
];
export default function FlightSelectionPanel({
  setter,
  next,
  isConfirmStep,
  FlightDataInput,
  extraButtonOnConfirm,
}: StepProps & {
  isConfirmStep?: boolean;
  FlightDataInput?: FlightData[];
  extraButtonOnConfirm?: React.ReactNode;
}) {
  //TODO fetch flight data from API
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const fetchFlightData = async () => {
    //TODO
    const data = await fetch("https://localhost:44379/api/Flight/GetAll");
    // console.log(await data.json());
    const flightDataRes: any = await data.json();
    setFlightData(
      flightDataRes.map((flight: any) => {
        return createData(
          flight.flights.id,
          flight.airLine.name,
          flight.begin.name +
            " " +
            formatTimestamp(flight.flights.departureTime),
          flight.end.name + " " + formatTimestamp(flight.flights.arrivalTime),
          "3 tiếng 5 phút",
          Number(flight.price.price)
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
            .toString()
        );
      }) as FlightData[]
    );
  };
  useEffect(() => {
    console.log("FlightDataInput", flightData);
    !FlightDataInput && fetchFlightData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow className="bg-mainColor/10 text-white hover:bg-mainColor/50 border">
            <TableCell>Hãng</TableCell>
            <TableCell align="right">Giờ cất cánh</TableCell>
            <TableCell align="right">Giờ đáp</TableCell>
            <TableCell align="right">Thời gian bay</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Xác nhận</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(FlightDataInput || flightData).map((row) => (
            <TableRow
              className="hover:bg-mainColor/10"
              key={row.id + Math.random() * 10}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.hang}
              </TableCell>
              <TableCell align="right">{row.giocatcanh}</TableCell>
              <TableCell align="right">{row.giohacanh}</TableCell>
              <TableCell align="right">{row.thoiGianBay}</TableCell>
              <TableCell align="right">
                <span className="text-lg">{row.Gia}</span>
              </TableCell>
              {!isConfirmStep ? (
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setter(row.id);
                      next();
                    }}
                    variant="contained"
                  >
                    {"Chọn"}
                  </Button>
                </TableCell>
              ) : (
                <TableCell align="right">
                  {extraButtonOnConfirm || (
                    <DoneAllIcon className="text-green-600" />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
          {flightData.length === 0 && FlightDataInput?.length === 0 ? (
            //make it center
            <div
              className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50
            "
            >
              <CircularProgress />
            </div>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
