export enum InvoiceStatus {
  THANH_TOAN = "Đã thanh toán",
  HUY = "Đã hủy",
}
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
interface IProps {
  status: InvoiceStatus;
}
const InvoiceStatusDisplay: React.FC<IProps> = ({status}) => {
  switch (status) {
    case InvoiceStatus.THANH_TOAN:
      return (
        <div className="text-green-500">
          <CheckCircleIcon />
          <span className="ml-2">{status}</span>
        </div>
      );
    case InvoiceStatus.HUY:
      return (
        <div className="text-red-500">
          <DoDisturbOnIcon />
          <span className="ml-2">{status}</span>
        </div>
      );
    default:
      return <div>{status}</div>;
  }
};

export default InvoiceStatusDisplay;
//   props: React.DetailedHTMLProps<
//     React.HTMLAttributes<HTMLDivElement>,
//     HTMLDivElement & {
//       status: InvoiceStatus;
//     }
