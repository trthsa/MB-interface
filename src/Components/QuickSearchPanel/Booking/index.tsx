import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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
  value?: any;
  setter: (id: any) => void;
  next: () => void;
}
function BookingPanel() {
  //TODO get flight params
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let departFrom = searchParams.get("departFrom");
  let departTo = searchParams.get("departTo");
  console.log(departFrom, departTo);
  //TODO fetch flights data
  //TODO fetch flight data from API
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const fetchFlightData = async () => {
    //TODO
    let data = null;
    if (String(departFrom) != "undefined" && String(departFrom) != "null") {
      data = await fetch(
        `https://localhost:44379/api/Search/Get/Route?idBegin=${departFrom}`
      );
    } else {
      data = await fetch("https://localhost:44379/api/Flight/GetAll");
    }
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
            <FlightSelectionPanel
              departData={{
                from_id: departFrom,
                to_id: departTo,
              }}
              setter={setFlightID}
              next={handleNext}
            />
          );
        case 1:
          return (
            <PassengerInfoInput setter={setPassengerInfo} next={handleNext} />
          );
        case 2:
          return (
            <SelectPaymentMethod
              value={paymentMethod}
              setter={setPaymentMethod}
              next={handleNext}
            />
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
        <BackAndForwardButton currentStep={activeStep} back={setActiveStep} />
      </div>
    </div>
  );
}

const BackAndForwardButton = ({
  back,
  currentStep,
  maxStep = 4,
}: {
  back: (back: any) => void;
  currentStep: number;
  maxStep?: number;
}) => {
  if (currentStep - 1 < 0 || currentStep >= maxStep) {
    return <></>;
  }
  return (
    <div className="flex justify-between w-full">
      <button
        className="bg-[#F2F2F2] rounded-md px-4 py-2 text-[#3659b8] font-semibold"
        onClick={() => back(currentStep - 1)}
      >
        Quay lại
      </button>
    </div>
  );
};

export default BookingPanel;
