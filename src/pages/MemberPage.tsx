import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import FlightSelectionPanel, {
  FlightData,
  createData,
  formatTimestamp,
} from "../components/QuickSearchPanel/Booking/components/FlightSelectionPanel";
import PopupModal from "../views/AdminViews/FlightOverview/components/PopupModal";

function MemberPage() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);

  const fetchFlightData = async () => {
    //TODO
    const data = await fetch("https://localhost:44379/api/Flight/GetAll");
    // console.log(await data.json());
    const flightDataRes: any = await data.json();
    setFlightData(
      flightDataRes
        .filter((item: { flights: { id: number } }) => item.flights.id === 9)
        .map((flight: any) => {
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
    fetchFlightData();
  }, []);

  return (
    <div className="w-screen flex justify-center mt-20">
      <div className="w-[80%] flex flex-col gap-10 justify-center items-center">
        <FlightSelectionPanel
          isConfirmStep={true}
          FlightDataInput={flightData}
          extraButtonOnConfirm={<PopUpVeDetails />}
          setter={function (id: any): void {
            throw new Error("Function not implemented.");
          }}
          next={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}

const PopUpVeDetails = () => {
  return (
    <PopupModal buttonName={"Xem chi tiết"}>
      <FlightDetails />
    </PopupModal>
  );
};

const FlightDetails = () => {
  return (
    <div className="min-w-[500px] bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold">Flight Ticket</div>
        <div className="text-sm text-gray-500">Seat 16A</div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Departure</div>
        <div className="text-sm font-bold">Los Angeles (LAX)</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Arrival</div>
        <div className="text-sm font-bold">New York (JFK)</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Flight</div>
        <div className="text-sm font-bold">UA 1037</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Date</div>
        <div className="text-sm font-bold">12 Oct 2023</div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Passenger</div>
        <div className="text-sm font-bold">John Smith</div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Price</div>
        <div className="text-sm font-bold">$385.00</div>
      </div>
      <div className="flex justify-center mt-10 flex-col items-center gap-10">
        <h1 className=" text-2xl font-bold">Quét mã để làm thủ tục</h1>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "50%", width: "100%" }}
          value={"Đây là QR mẫu từ HuJet"}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};
export default MemberPage;
