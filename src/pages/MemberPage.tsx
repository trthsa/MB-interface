import { Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import { fetchFlight } from "../api/apis";
import { LocalGetter } from "../components/AccLogging/Login";
import FlightSelectionPanel, {
  FlightData,
  createData,
  formatTimestamp,
} from "../components/QuickSearchPanel/Booking/components/FlightSelectionPanel";
import { Flight, Invoice } from "../components/interface/Flight";
import { FlightDataType } from "../interface/FlightData";
import LoadingIcon from "../style/components/LoadingIcon";
import PopupModal from "../views/AdminViews/FlightOverview/components/PopupModal";

// example userInfo
// {
//     "UserName": "phong",
//     "Id": "14",
//     "email": "adsad@gmail.com",
//     "TokenId": "ac1ac116-74e2-4df4-88b9-3222de524b2b",
//     "nbf": 1684945212,
//     "exp": 1684945272,
//     "iat": 1684945212
// }

function MemberPage() {
  //TODO get user
  const [user, setUser] = useState<any | null>();

  useEffect(() => {
    setUser(LocalGetter("user"));
  }, []);
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);
  const fetchFlightData = async () => {
    //TODO
    const data = await fetch("https://localhost:44379/api/Flight/GetAll");
    // console.log(await data.json());
    const flightDataRes: any = await data.json();
    setFlightData(flightDataRes);
  };

  const fetchInvoicesData = async () => {
    const response = await fetch("https://localhost:44379/api/Invoice/GetAll");
    const data = await response.json();
    setInvoicesData(data);
    return data;
  };
  const filteredInvoiceData = invoicesData.filter(
    (item) => item.tempcustomer.email === user?.email
  );
  const filteredFlightData: {
    flights: Flight[];
    invoice: Invoice[];
  } = {
    flights: (() => {
      const flightDataRes: Flight[] = [];
      flightData.forEach((item) => {
        let willTake = false;
        filteredInvoiceData.forEach((invoice) => {
          if (
            invoice.ticket.flightID === Number(item.flights.id) &&
            invoice.invoice.paymentStatus === "Đã thanh toán"
          ) {
            willTake = true;
            flightDataRes.push(item);
          }
        });
        return willTake;
      });
      return flightDataRes;
    })(),
    invoice: filteredInvoiceData,
  };
  console.log(filteredFlightData, "filteredFlightData");

  // cónt

  useEffect(() => {
    fetchFlightData();
    fetchInvoicesData();
  }, []);
  if (!user?.UserName) {
    return (
      <div className="w-screen flex flex-col items-center justify-center mt-20">
        <div className="p-10 bg-slate-500/10 rounded-2xl text-center">
          Hãy đăng nhập để xem lịch sử mua vé của bạn <br />
          <Button
            sx={{
              mt: 2,
            }}
            size="small"
            variant="contained"
          >
            <Link
              style={{
                color: "white",
              }}
              href="/acc_logging"
              className="text-white"
            >
              Đăng nhập
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen flex flex-col items-center justify-center mt-20">
      <div className="w-[80%] flex flex-col gap-10 justify-center items-center">
        <div className="text-start w-full text-xl font-bold ">
          Lịch sử mua vé của bạn{" "}
          <span className="text-mainColor">{user?.UserName}</span>
        </div>
        <FlightSelectionPanel
          isConfirmStep={true}
          FlightDataInput={
            filteredFlightData.flights.map((flight: any) => {
              return createData(
                flight.flights.id,
                flight.airLine.name,
                flight.begin.name +
                  " " +
                  formatTimestamp(flight.flights.departureTime),
                flight.end.name +
                  " " +
                  formatTimestamp(flight.flights.arrivalTime),
                "3 tiếng 5 phút",
                Number(flight.price.price)
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  .toString()
              );
            }) as FlightData[]
          }
          extraInvoices={filteredFlightData.invoice}
          extraDetailsButton={
            <PopUpVeDetails invoice={undefined} flightid={"9"} />
          }
          setter={function (id: any): void {
            throw new Error("Function not implemented.");
          }}
          next={function (): void {
            throw new Error("Function not implemented.");
          }}
          departData={{
            from_id: null,
            to_id: null,
          }}
        />
      </div>
    </div>
  );
}
interface IProps4Flight {
  flightid: string;
  invoice: Invoice | undefined;
}

const PopUpVeDetails = ({ flightid, invoice }: IProps4Flight) => {
  return (
    <PopupModal buttonName={"Xem chi tiết"}>
      <FlightDetails flightid={flightid} invoice={invoice} />
    </PopupModal>
  );
};

const FlightDetails = ({ flightid, invoice }: IProps4Flight) => {
  const [flight, setFlight] = useState<FlightDataType>();
  //TODO fetch invoice
  if (!invoice) {
    return <LoadingIcon />;
  }
  console.log(invoice, "invoice", flightid);

  useEffect(() => {
    fetchFlight(flightid).then((_flight) => setFlight(_flight));
  }, []);
  if (!flight) {
    return <LoadingIcon />;
  }

  return (
    <div className="min-w-[500px] bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold">Flight Ticket</div>
        <div className="text-sm text-gray-500">Mã số {flight.flights.id}</div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Khởi hành tại</div>
        <div className="text-sm font-bold">
          {flight?.begin.location} ({flight?.begin.name})
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Đến tại</div>
        <div className="text-sm font-bold">
          {flight?.end.location} ({flight?.end.name})
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Mã số vé</div>
        <div className="text-sm font-bold">{flight?.detail.id}</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Ngày khởi hành</div>
        <div className="text-sm font-bold">
          {formatTimestamp(flight?.flights.departureTime)}
        </div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Cổng số</div>
        <div className="text-sm font-bold">{flight?.begin.gates}</div>
      </div>
      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Tích lũy được</div>
        <div className="text-sm font-bold">
          {Number(flight?.price.price) / 1000} điểm
        </div>
      </div>

      <hr className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Giá gốc</div>
        <div className="text-sm font-bold line-through">
          <span className="text-slate-500">đ{flight?.price.price}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Khuyến mãi</div>
        <div className="text-sm font-bold">đ{flight?.price.price * 0.1}</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">Giá vé</div>
        <div className="text-sm font-bold">
          đ{flight?.price.price - flight?.price.price * 0.1}
        </div>
      </div>
      <div className="flex justify-center mt-10 flex-col items-center gap-10">
        <h1 className=" text-2xl font-bold">Quét mã để làm thủ tục</h1>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "50%", width: "100%" }}
          value={`VE${flight?.flights.id}-IDDEPART${flight?.begin.id}-IDARRIVAL${flight?.end.id}`}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};
export default MemberPage;
