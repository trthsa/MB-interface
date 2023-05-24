import BookingPanel from "../components/QuickSearchPanel/Booking";

function BookingView() {
  return (
    <div className="py-10 min-h-full ">
      <BookingPanel />
      <div className="">
        <img src="/Images/bg_may.png" alt="" className="absolute bottom-0 -z-10"/>
      </div>
    </div>
  );
}

export default BookingView;
