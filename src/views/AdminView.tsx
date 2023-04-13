import Dashboard from "../components/Dashboard";
import SideMenu from "../components/SideMenu";

function AdminView() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1 bg-sky-950 shadow-2xl">
        <SideMenu />
      </div>
      <div className="col-span-4 ">
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminView;
