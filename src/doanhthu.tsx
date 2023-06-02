import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Invoice } from "./components/interface/Flight";
export function formatMoney(number: number) {
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
      <p className="text-3xl font-bold mb-10">Báo cáo doanh thu</p>
      <ChartDoanhThu data={invoice || []} />
      <div className="my-10 flex gap-10">
        <div>
          <Item
            name={"Tổng doanh thu"}
            value={formatMoney(tongDoanhthu) + "đ"}
          />
        </div>
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
    <div className="rounded-xl p-5 bg-amber-600 w-fit h-fit text-end flex flex-col gap-5">
      <p className="text-white text-xl font-light">{name}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};

const ChartDoanhThu: React.FC<{
  data: Invoice[];
}> = ({ data }) => {
  const cleanedAnalysisData: {
    [key: string]: {
      total: number;
    };
  } = {};
  const cleanedData = data.map((item) => {
    cleanedAnalysisData[item.ticket.flightID] = {
      total: data.reduce((count, item2) => {
        if (item2.ticket.flightID === item.ticket.flightID) {
          return count + 1;
        }
        return count;
      }, 0),
    };
  });
  return (
    <div style={{ width: "100%" }}>
      <BarChart
        width={500}
        height={300}
        data={Object.keys(cleanedAnalysisData).map((key) => ({
          name: key,
          flightsCount: cleanedAnalysisData[key].total,
        }))}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="flightsCount"
          fill="#8884d8"
          shape={
            <TriangleBar
              fill={undefined}
              x={undefined}
              y={undefined}
              width={undefined}
              height={undefined}
            />
          }
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};
export default DoanhThu;
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: {
  fill: any;
  x: any;
  y: any;
  width: any;
  height: any;
}) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
