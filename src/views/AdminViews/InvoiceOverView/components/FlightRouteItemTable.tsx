import { Invoice } from "../../../../components/interface/Flight";

interface OProperty {
  Name: string;
  Value: string | number;
}

const InvoiceItemTable = ({
  invoice,
  isScrolling,
}: {
  invoice: Invoice;
  isScrolling?: boolean;
}) => {
  const data: OProperty[] = [
    {
      Name: "Invoice ID",
      Value: invoice.invoice.id,
    },
    {
      Name: "Customer Email",
      Value: invoice.tempcustomer.email,
    },
    {
      Name: "Payment Method",
      Value: invoice.ticket.paymentMethods,
    },
    {
      Name: "Payment Status",
      Value: invoice.invoice.paymentStatus,
    },
  ];

  return (
    <div
      className={`max-w-5xl h-full mx-auto ${
        isScrolling && "overflow-scroll scrollbar-thin"
      }`}
    >
      <h2 className="text-3xl font-bold mb-5">Invoice Details Information</h2>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Property
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {/* <tr>
            <td className="px-6 py-4 whitespace-nowrap font-bold">Flight ID</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {flightRoute.begin.gates}
            </td>
          </tr> */}

          {data.map((item) => {
            return <AProperty key={item.Name} {...item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const AProperty = ({ Name, Value }: OProperty) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap font-bold">{Name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{Value}</td>
    </tr>
  );
};
export default InvoiceItemTable;
