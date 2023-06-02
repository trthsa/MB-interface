import { Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import { fetchFlight } from "../api/apis";
import { LocalGetter } from "../components/AccLogging/Login";
import InvoiceStatusDisplay, {
  InvoiceStatus,
} from "../components/Display/InvoiceStatusDisplay";
import FlightDisplayerPanel, {
  ComboflightInvoiceInfo,
} from "../components/QuickSearchPanel/Booking/components/FlightDisplayerPanel";
import { formatTimestamp } from "../components/QuickSearchPanel/Booking/components/FlightSelectionPanel";
import { Flight, Invoice } from "../components/interface/Flight";
import { formatMoney } from "../doanhthu";
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
interface IProps4Flight {
  flightid: string;
  invoice: Invoice | undefined;
}

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
      console.log(flightData, "flightData");

      const flightDataRes: Flight[] = [];
      flightData.forEach((item) => {
        let willTake = false;
        filteredInvoiceData.forEach((invoice) => {
          if (invoice.ticket.flightID === Number(item.flights.id)) {
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
        <div className="flex gap-10 w-full justify-start">
          <Item
            name="Tổng chi tiêu"
            value={
              "đ" +
              formatMoney(
                filteredInvoiceData.reduce((acc, cur) => {
                  if (cur.invoice.paymentStatus === InvoiceStatus.HUY) {
                    return 0;
                  }
                  return acc + cur.invoice.amount;
                }, 0)
              )
            }
          />
          <Item
            name="Tổng giờ bay"
            value={formatMoney(
              filteredInvoiceData.reduce((acc, cur) => {
                if (cur.invoice.paymentStatus === InvoiceStatus.HUY) {
                  return 0;
                }
                return acc + 1;
              }, 0) * 1.5
            )}
            color="bg-amber-400"
          />
        </div>
        <div className="text-start w-full text-xl font-bold ">
          Lịch sử mua vé của bạn{" "}
          <span className="text-mainColor">{user?.UserName}</span>
        </div>
        <FlightDisplayerPanel
          comboflightInvoiceInfo={
            filteredFlightData.flights.map((flight: any) => {
              return {
                flight: flight,
                invoice: filteredFlightData.invoice.find(
                  (invoice) =>
                    invoice.ticket.flightID === Number(flight.flights.id)
                ),
              } as ComboflightInvoiceInfo;
            }) || []
          }
          isConfirmStep={true}
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

const PopUpVeDetails = ({ flightid, invoice }: IProps4Flight) => {
  const isCancelled = invoice?.invoice.paymentStatus === InvoiceStatus.HUY;
  return (
    <PopupModal
      isErr={isCancelled}
      buttonName={isCancelled ? <p>Vé đã hủy</p> : <>Xem chi tiết</>}
    >
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

  if (invoice.invoice.paymentStatus === InvoiceStatus.HUY) {
    return (
      <div className="min-w-[500px] bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold">Flight Ticket</div>
          <div className="text-sm text-gray-500">
            <div className="flex flex-col items-end">
              <p>Mã số {invoice.invoice.id}</p>
              <InvoiceStatusDisplay
                status={invoice.invoice.paymentStatus as InvoiceStatus}
              />
            </div>
          </div>
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
        <div className="flex items-center justify-between mb-4 text-red-500">
          Vé đã được hủy bởi hỗ trợ viên
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[500px] bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold">Flight Ticket</div>
        <div className="text-sm text-gray-500">
          <div className="flex flex-col items-end">
            <p>Mã số {invoice.invoice.id}</p>
            <InvoiceStatusDisplay
              status={invoice.invoice.paymentStatus as InvoiceStatus}
            />
          </div>
        </div>
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
          value={`VE${flight?.flights.id}-ID${invoice.ticket.id}-IDDEPART${flight?.begin.id}-IDARRIVAL${flight?.end.id}`}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

const Item = ({
  name,
  value,
  color = "bg-sky-400",
}: {
  name: string;
  value: string;
  color?: string;
}) => {
  return (
    <div
      className={`rounded-xl p-5 ${color} w-fit text-end flex flex-col gap-5 shadow-lg hover:scale-110 transform transition-all cursor-pointer`}
    >
      <p className="text-white text-xl font-light">{name}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};
export default MemberPage;
