import { useEffect, useState } from "react";
import { Invoice, User } from "../../../../components/interface/Flight";

interface OProperty {
  Name: string;
  Value: string | number;
}

const SoGioBay = ({ invoice }: { user: User; invoice: Invoice[] }) => {
  const GIO_BAY = 1.5;
  return invoice.length * GIO_BAY;
};

const UserItemTable = ({
  user,
  isScrolling,
}: {
  user: User;
  isScrolling?: boolean;
}) => {
  const data: OProperty[] = [
    {
      Name: "User ID",
      Value: user.id,
    },
    {
      Name: "Username",
      Value: user.userName,
    },
    {
      Name: "Email",
      Value: user.email,
    },
  ];
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const userInvoice = invoice.filter(
    (invoice) => invoice.tempcustomer.email === user.email
  );
  const [isLoading, setIsLoading] = useState(true);
  const fetchInvoicesData = async () => {
    const response = await fetch("https://localhost:44379/api/Invoice/GetAll");
    const data = await response.json();
    setInvoice(data);

    return data;
  };
  useEffect(() => {
    //TODO fetch data
    fetchInvoicesData();
  }, []);
  return (
    <div
      className={`max-w-5xl h-full mx-auto ${
        isScrolling && "overflow-scroll scrollbar-thin"
      }`}
    >
      <h2 className="text-3xl font-bold mb-5">Users Details Information</h2>
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
          {data.map((item) => {
            return <AProperty key={item.Name} {...item} />;
          })}
          <AProperty
            Name="Tổng giờ bay"
            Value={SoGioBay({
              user,
              invoice: userInvoice,
            })}
          />
          <AProperty
            Name="Tổng số điểm bay tích lũy "
            Value={
              Number(
                SoGioBay({
                  user,
                  invoice: userInvoice,
                }) *
                  0.1 *
                  10000
              )
                .toFixed(0)
                .toString() + " điểm"
            }
          />
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
export default UserItemTable;
