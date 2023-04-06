import QuickSearchPanel from "../Components/QuickSearchPanel/QuickSearchPanel";

function HomeView() {
  return (
    <div>
      {/* <HeaderBanner /> */}{" "}
      <div className="relative flex justify-end px-32 my-20 h-full">
        <img
          className="absolute -top-20  left-0 w-full h-full object-cover"
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
