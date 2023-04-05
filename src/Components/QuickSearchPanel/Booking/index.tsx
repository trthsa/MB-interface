import { useState } from "react";
import BookingSteps from "./components/BookingSteps";
import ConfrimPanel from "./components/ConfrimPanel";
import FlightSelectionPanel from "./components/FlightSelectionPanel";
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
  const StepSpawn = () => {
    switch (activeStep) {
      case 0:
        return <FlightSelectionPanel setter={setFlightID} next={handleNext} />;
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
            userCCID={passengerInfo?.ccid}
            email={passengerInfo?.email}
            phone={passengerInfo?.phone}
            paymentMethod={paymentMethod}
            setter={setIsConfirmed}
            next={handleNext}
          />
        );
      case 4:
        return <ReceiptPanel setter={() => {}} next={handleNext} />;
      default:
        return <div>Not found</div>;
    }
  };
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
