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
      dateTime: "2023-04-06T00:58:40.649Z",
      ticketclassId: 0,
      paymentMethods: paymentMethod,
      flightID: flightID,
      voucherID: 0,
      codeSeats: "string",
      tempId: 0,
    },
    customer: {
      id: 0,
      phone: phone,
      email: email,
      nationCCIDID: Number(userCCID),
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
    return fetch("https://localhost:44379/api/Ticket/Create", {
      headers: {
        accept: "*/*",
        "accept-language": "vi,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,la;q=0.6",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "YaBrowser";v="23"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://localhost:44379/swagger/index.html",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"ticket":{"id":0,"dateTime":"2023-04-21T01:19:14.618Z","ticketclassId":0,"paymentMethods":"string","flightID":0,"voucherID":0,"codeSeats":"string","tempId":0},"customer":{"id":0,"phone":"string","email":"string","nationCCIDID":0}}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }).then((res) => {
      setter(true);
      console.log(res);
      console.log("done");
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
            boardCastTicketToServer().then(() => next());
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
