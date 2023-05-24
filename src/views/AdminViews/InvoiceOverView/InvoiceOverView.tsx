import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import { Invoice } from "../../../components/interface/Flight";
import LoadingIcon from "../../../style/components/LoadingIcon";
import InvoiceItemTable from "./components/FlightRouteItemTable";
const fetchInvoices = async () => {
  const response = await fetch("https://localhost:44379/api/Invoice/GetAll");
  const data = await response.json();
  return data;
};
function InvoiceOverView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const tempInvoices = useRef<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //TODO fetch data
    setIsLoading(true);
    fetchInvoices().then((data) => {
      setInvoices(data);
      tempInvoices.current = data;
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <div className="px-20 pt-10">
        <h1 className="text-3xl font-bold mb-5">Invoice Information</h1>
        <TextField
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setInvoices(tempInvoices.current);
            } else {
              const newInvoices = tempInvoices.current.filter((invoice) =>
                invoice.invoice.id.toString().includes(value)
              );
              setInvoices(newInvoices);
            }
          }}
          id="outlined-basic"
          label="Search by invoice ID"
          variant="outlined"
          className="w-1/2"
        />
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
  const [isCanceling, setIsCanceling] = useState(false);
  const cancelInvoice = async (id: string) => {
    fetch(`https://localhost:44379/api/Invoice/UpdateInvoice?id=${id}`, {
      headers: {
        accept: "*/*",
        "accept-language": "vi,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,la;q=0.6",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "YaBrowser";v="23"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://localhost:44379/swagger/index.html",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"id":${id},"paymentDate":"2023-05-24T17:58:15.379Z","amount":0,"paymentStatus":"Đã hủy","bookingId":0,"customerName":"string","revenueID":0,"idAdmin":0,"idTicket":0}`,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }).then((res) => {
      if (res.status === 200) {
        alert("Cancel invoice successfully");
        window.location.reload();
      } else {
        alert("Cancel invoice failed");
      }
    });
  };
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
          <InvoiceItemTable
            isScrolling
            invoice={
              invoices.filter(
                (invoice) =>
                  invoice.invoice.id === clickedInvoice.current?.invoice.id
              )[0]
            }
          />
          <div className="w-full flex justify-center h-12 ">
            <Button
              disabled={
                invoices.filter(
                  (invoice) =>
                    invoice.invoice.id === clickedInvoice.current?.invoice.id
                )[0]?.invoice?.paymentStatus === "Đã hủy"
              }
              onClick={() => {
                cancelInvoice(String(clickedInvoice.current?.invoice?.id));
                setIsCanceling(true);
              }}
              sx={{
                mt: 2,
                px: 4,
              }}
              size="large"
              variant="contained"
              color="error"
              //error
            >
              {isCanceling ? <LoadingIcon /> : "Hủy vé"}
            </Button>
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
