import { Link } from "react-router-dom";

const SideMenuItem = ({
  name,
  link,
}: {
  name: string;
  link: AdminMenuLink;
}) => {
  return (
    <Link to={link}>
      <div className="w-full text-xl text-white px-7 py-7 hover:bg-sky-700 cursor-pointer">
        {name}
      </div>
    </Link>
  );
};

enum AdminMenuLink {
  None = "#",
  Flight = "flight",
  FlightRoute = "flightRoute",
}

const MenuItems = [
  {
    name: "Chuyến bay",
    link: AdminMenuLink.Flight,
  },
  {
    name: "Tuyến bay",
    link: AdminMenuLink.FlightRoute,
  },
];
function SideMenu() {
  return (
    <div className="flex flex-col">
      <SideMenuItem link={AdminMenuLink.None} name={"Menu"} />
      {MenuItems.map((item, index) => (
        <SideMenuItem link={item.link} key={index} name={item.name} />
      ))}
    </div>
  );
}

export default SideMenu;
