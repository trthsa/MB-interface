import React, { useEffect, useState } from "react";
import { Invoice } from "./components/interface/Flight";
function formatMoney(number: number) {
  // Convert the number to a string
  var str = number.toString();

  // Split the string into whole and decimal parts
  var parts = str.split(".");
  var wholePart = parts[0];
  var decimalPart = parts[1] || "";

  // Add commas to the whole part
  var formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add decimal places
  var formattedDecimalPart = decimalPart.padEnd(2, "0");

  // Combine the formatted parts
  var formattedNumber = formattedWholePart + "." + formattedDecimalPart;

  return formattedNumber;
}
function DoanhThu() {
  const [invoice, setInvoicesData] = useState<Invoice[]>();
  const fetchInvoicesData = async () => {
    const response = await fetch("https://localhost:44379/api/Invoice/GetAll");
    const data = await response.json();
    setInvoicesData(data);
    return data;
  };
  useEffect(() => {
    fetchInvoicesData().then((data) => {
      setInvoicesData(data);
    });
  }, []);
  let tongDoanhthu = 0;
  invoice?.forEach((invoice) => {
    tongDoanhthu += invoice.invoice.amount;
  });
  

  return (
    <div className="p-10">
      <p className="text-3xl font-bold">Báo cáo doanh thu</p>
      <div className="my-10 flex gap-10">
        <Item name={"Tổng doanh thu"} value={formatMoney(tongDoanhthu) + "đ"} />
        <Item
          name={"Tổng số vé"}
          value={formatMoney(invoice?.length || 0) + " vé đã bán"}
        />
      </div>
    </div>
  );
}

const Item = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="rounded-xl p-5 bg-amber-600 w-fit text-end flex flex-col gap-5">
      <p className="text-white text-xl font-light">{name}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};
export default DoanhThu;
