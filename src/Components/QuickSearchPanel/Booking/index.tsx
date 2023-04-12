import { useEffect, useMemo, useState } from "react";
import BookingSteps from "./components/BookingSteps";
import ConfrimPanel from "./components/ConfrimPanel";
import FlightSelectionPanel, {
  FlightData,
  createData,
} from "./components/FlightSelectionPanel";
import PassengerInfoInput from "./components/PassengerInfoInput";
import ReceiptPanel from "./components/ReceiptPanel";
import SelectPaymentMethod, {
  PaymentMethod,
} from "./components/SelectPaymentMethod";

export interface StepProps {
  setter: (id: any) => void;
  next: () => void;
}
function BookingPanel() {
  //TODO fetch flights data
  //TODO fetch flight data from API
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const fetchFlightData = async () => {
    //TODO
    const data = await fetch("https://localhost:44379/api/Flight/GetAll");
    // console.log(await data.json());
    // if (flightData.length <= 0) {
    //   return;
    // }
    const flightDataRes: any = await data.json();
    setFlightData(
      flightDataRes.map((flight: any) => {
        return createData(
          flight.flights.id,
          flight.airLine.name,
          flight.begin.name,
          flight.end.name,
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
    // console.log("fetching flight data");

    fetchFlightData();
  }, []);

  //TODO data for steps
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  //?step 1: select flight: state: flight info
  const [flightID, setFlightID] = useState<string | null>(null);
  //?step 2: passenger info
  const [passengerInfo, setPassengerInfo] = useState<{
    email: string;
    phone: string;
    ccid: string;
  } | null>(null);
  //?step 3: Select payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.MoMo
  );
  //?step 4: Confirm and pay
  const [isConfirmed, setIsConfirmed] = useState(false);
  const StepSpawn = useMemo(
    () => () => {
      switch (activeStep) {
        case 0:
          return (
            <FlightSelectionPanel setter={setFlightID} next={handleNext} />
          );
        case 1:
          return (
            <PassengerInfoInput setter={setPassengerInfo} next={handleNext} />
          );
        case 2:
          return (
            <SelectPaymentMethod setter={setPaymentMethod} next={handleNext} />
          );
        case 3:
          return (
            <ConfrimPanel
              flightsData={flightData}
              flightID={flightID || ""}
              userCCID={passengerInfo?.ccid}
              email={passengerInfo?.email}
              phone={passengerInfo?.phone}
              paymentMethod={paymentMethod}
              setter={setIsConfirmed}
              next={handleNext}
            />
          );
        case 4:
          return (
            <ReceiptPanel
              isConfirmed={isConfirmed}
              flightsData={flightData}
              flightID={flightID || ""}
              setter={() => {}}
              next={handleNext}
            />
          );
        default:
          return <div>Not found</div>;
      }
    },
    [activeStep]
  );
  return (
    <div className="flex justify-center">
      <div className="w-[80%] flex flex-col gap-10 justify-center items-center">
        <BookingSteps step={activeStep} />
        <StepSpawn />
      </div>
    </div>
  );
}

export default BookingPanel;
