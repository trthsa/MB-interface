import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { StepProps } from "..";
import FlightSelectionPanel, { FlightData } from "./FlightSelectionPanel";
import { PaymentMethod } from "./SelectPaymentMethod";

function ConfrimPanel({
  next,
  setter,
  userCCID,
  email,
  phone,
  paymentMethod,
  flightID,
  flightsData,
}: StepProps & {
  flightID: string;
  flightsData: FlightData[];
  userCCID?: string;
  email?: string;
  phone?: string;
  paymentMethod?: PaymentMethod;
}) {
  const [chosenFlight, setChosenFlight] = useState<FlightData[]>([]);
  const sendingData = {
    ticket: {
      id: 0,
      dateTime: "2023-05-21T06:09:18.307Z",
      ticketclassId: 1,
      paymentMethods: "momo",
      flightID: 19,
      voucherID: 1,
      codeSeats: "B12",
      tempId: 0,
    },
    customer: {
      id: 0,
      phone: "034891231",
      email: "nghiadeptrai@123",
      nationCCIDID: 1,
    },
  };
  const boardCastTicketToServer = async () => {
    // fetch("https://localhost:44379/api/Ticket/Create", {
    //   headers: {
    //     accept: "*/*",
    //     "content-type": "application/json",
    //   },

    //   body: JSON.stringify(sendingData),
    //   method: "POST",
    // }).then((res) => {
    //   setter(true);
    //   console.log(res);
    //   console.log("done");
    // });

    return await fetch("https://localhost:44379/api/Ticket/Create", {
      headers: {
        accept: "*/*",
        "accept-language": "vi,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,la;q=0.6",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        cookie:
          "BanveMaybay=CfDJ8GjwrKHReKNIpQsZl3cudoIUPs5OZ1NCEDyOR%2B4ognZtqSR3FGzTxAu%2FFICWGZFuzavtpUZ82PWpwU1VXp1i3TyQ%2FvffI4dvct%2BziBhXsc%2FkWUEKnAeUJCCf1Gdw8i9eVGdY0%2FTPlzEUmE1PnEvE3ytgOLtB85a%2FJsg37%2FOWyPLA",
      },
      body: '{"ticket":{"id":0,"dateTime":"2023-05-21T06:09:18.307Z","ticketclassId":1,"paymentMethods":"momo","flightID":3,"voucherID":1,"codeSeats":"B12","tempId":0},"customer":{"id":0,"phone":"034891231","email":"nghiadeptrai@123","nationCCIDID":1}}',
      method: "POST",
    }).then((res) => {
      setter(true);
      return res.json();
    });
  };
  useEffect(() => {
    // chosenFlight.push(flightsData.filter((flight) => flight.id == flightID));
    console.log(
      setChosenFlight(flightsData.filter((flight) => flight.id == flightID))
    );
  }, []);
  return (
    <div>
      <h1 className="text-2xl my-2 ">Xác nhận đặt vé</h1>
      <Paper elevation={3} className="p-5 min-w-[650px] flex flex-col gap-10">
        <div>
          <FlightSelectionPanel
            FlightDataInput={[...chosenFlight]}
            isConfirmStep
            next={next}
            setter={setter}
          />
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
            boardCastTicketToServer().then((i) => {
              console.log(i);
              next();
            });
            // next();
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
