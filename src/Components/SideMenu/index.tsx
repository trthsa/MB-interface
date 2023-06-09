import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightIcon from "@mui/icons-material/Flight";
import Person4Icon from "@mui/icons-material/Person4";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";
const SideMenuItem = ({
  name,
  link,
}: {
  name: string | React.ReactNode;
  link: AdminMenuLink;
}) => {
  return (
    <Link to={link}>
      <div className="hover:shadow-2xl active:shadow-sky-700 hover:shadow-sky-400 w-full text-xl text-white px-7 py-7 hover:bg-sky-700 cursor-pointer">
        {name}
      </div>
    </Link>
  );
};

export enum AdminMenuLink {
  None = "",
  Flight = "flight",
  FlightRoute = "flightRoute",
  Invoice = "invoice",
  User = "user",
}
const MenuItems = [
  {
    name: (
      <>
        <FlightIcon />
        Chuyến bay
      </>
    ),
    link: AdminMenuLink.Flight,
  },
  {
    name: (
      <>
        <ConnectingAirportsIcon />
        Tuyến bay
      </>
    ),
    link: AdminMenuLink.FlightRoute,
  },
  {
    name: (
      <>
        <ReceiptIcon />
        Hóa đơn
      </>
    ),
    link: AdminMenuLink.Invoice,
  },
  {
    name: (
      <>
        <Person4Icon />
        Người dùng
      </>
    ),
    link: AdminMenuLink.User,
  },
];
function SideMenu() {
  return (
    <div className="flex flex-col">
      {/* <SideMenuItem link={AdminMenuLink.None} name={"Menu"} /> */}
      <div className="text-center py-3 bg-sky-500/80 text-xl cursor-pointer">
        Menu
      </div>
      {MenuItems.map((item, index) => (
        <SideMenuItem link={item.link} key={index} name={item.name} />
      ))}
    </div>
  );
}

export default SideMenu;
