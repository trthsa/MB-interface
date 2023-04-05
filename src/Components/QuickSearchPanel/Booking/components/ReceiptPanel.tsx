import { Paper } from "@mui/material";
import { StepProps } from "..";
import FlightSelectionPanel from "./FlightSelectionPanel";

function ReceiptPanel({ next, setter }: StepProps & {}) {
  return (
    <div>
      <h1 className="text-2xl my-2 ">Hóa Đơn Dịch vụ và Vé của bạn</h1>
      <Paper elevation={3} className=" p-5 min-w-[650px] flex flex-col gap-10">
        <div>
          <FlightSelectionPanel isConfirmStep next={next} setter={setter} />
        </div>
      </Paper>
    </div>
  );
}

export default ReceiptPanel;
