import { Button, Paper } from "@mui/material";
import { StepProps } from "..";
import FlightSelectionPanel from "./FlightSelectionPanel";
import { PaymentMethod } from "./SelectPaymentMethod";

function ConfrimPanel({
  next,
  setter,
  userCCID,
  email,
  phone,
  paymentMethod,
}: StepProps & {
  userCCID?: string;
  email?: string;
  phone?: string;
  paymentMethod?: PaymentMethod;
}) {
  return (
    <div>
      <h1 className="text-2xl my-2 ">Xác nhận đặt vé</h1>
      <Paper elevation={3} className="p-5 min-w-[650px] flex flex-col gap-10">
        <div>
          <FlightSelectionPanel isConfirmStep next={next} setter={setter} />
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-4">Thông tin hành khách</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">CCID:</span>
              <span className="font-semibold">{userCCID}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Email:</span>
              <span className="font-semibold">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Số điện thoại:</span>
              <span className="font-semibold">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">
                Hình thức thanh toán:
              </span>
              <span className="font-semibold">{paymentMethod}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            setter(true);
            next();
          }}
          variant="contained"
        >
          Thanh toán ngay
        </Button>
      </Paper>
    </div>
  );
}

export default ConfrimPanel;
