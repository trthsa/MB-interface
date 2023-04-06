import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { StepProps } from "..";
import FlightSelectionPanel, { FlightData } from "./FlightSelectionPanel";
function ReceiptPanel({
  next,
  setter,
  flightID,
  flightsData,
  isConfirmed,
}: StepProps & {
  flightID: string;
  flightsData: FlightData[];
  isConfirmed: boolean;
}) {
  const [chosenFlight, setChosenFlight] = useState<FlightData[]>([]);

  useEffect(() => {
    // chosenFlight.push(flightsData.filter((flight) => flight.id == flightID));
    console.log(
      setChosenFlight(flightsData.filter((flight) => flight.id == flightID))
    );
  }, []);

  if (!isConfirmed) {
    return (
      <div>
        <h1 className="text-2xl my-2 ">Hóa Đơn Dịch vụ và Vé của bạn</h1>
        <Paper
          elevation={3}
          className=" p-5 min-w-[650px] flex flex-col gap-10"
        >
          <div>
            Đang xử lý, vui lòng đợi trong giây lát{" "}
            <AutorenewIcon className="animate-spin" />
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl my-2 ">Hóa Đơn Dịch vụ và Vé của bạn</h1>
      <Paper elevation={3} className=" p-5 min-w-[650px] flex flex-col gap-10">
        <div>
          <FlightSelectionPanel
            FlightDataInput={[...chosenFlight]}
            isConfirmStep
            next={next}
            setter={setter}
          />
        </div>
      </Paper>
    </div>
  );
}

export default ReceiptPanel;
