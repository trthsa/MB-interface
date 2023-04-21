import QuickSearchPanel from "../components/QuickSearchPanel/QuickSearchPanel";

function HomeView() {
  return (
    <div>
      {/* <HeaderBanner /> */}{" "}
      <div className="relative flex justify-end px-32 my-20 h-full">
        <img
          className="absolute min-h-screen left-0 w-full h-full object-cover"
          src="Images/pannellogo.png"
          alt=""
        />
        <div className="z-10">
          <QuickSearchPanel />
        </div>
      </div>
    </div>
  );
}

export default HomeView;
