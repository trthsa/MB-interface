import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import { Invoice } from "../../components/interface/Flight";
import LoadingIcon from "../../style/components/LoadingIcon";
const fetchInvoices = async () => {
  const response = await fetch("https://localhost:44379/api/Invoice/GetAll");
  const data = await response.json();
  return data;
};
function InvoiceOverView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //TODO fetch data
    setIsLoading(true);
    fetchInvoices().then((data) => {
      setInvoices(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <div className="px-20 pt-10">
        <h1 className="text-3xl font-bold mb-5">Invoice Information</h1>

        {isLoading ? <LoadingIcon /> : <InvoicesTable invoices={invoices} />}
      </div>
    </>
  );
}

const InvoicesTable = ({ invoices }: { invoices: Invoice[] }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const clickedInvoice = useRef<Invoice | null>(null);
  return (
    <>
      <div className={`bg-white shadow-md rounded my-6`}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Vé ID
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Họ & Tên Khách hàng
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Email Khách hàng
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Ghế số
              </th>
              <th className="px-6 py-4 text-left bg-gray-100 border-b">
                Tình trạng thanh toán
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                onClick={() => {
                  clickedInvoice.current = invoice;
                  handleOpen();
                }}
                key={invoice.invoice.id}
                className="hover:bg-gray-100 border-b cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoice.customerName} {invoice.nation.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.tempcustomer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.ticket.codeSeats}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoice.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          //make flex and justify center

          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid var(--primary-color)",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* <FlightRouteItemTable
            isScrolling
            flight={
              flightRoutes.filter(
                (route) =>
                  route.route.id === clickedFlightRoute.current?.route.id
              )[0]
            }
          /> */}
          <div>
            <LoadingIcon />
          </div>
        </Box>

        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
      </Modal>
    </>
  );
};

export default InvoiceOverView;
