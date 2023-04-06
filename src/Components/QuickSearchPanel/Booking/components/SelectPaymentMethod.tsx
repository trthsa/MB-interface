import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { StepProps } from "..";

export enum PaymentMethod {
  MoMo = "MoMo",
  Visa = "Visa",
  MasterCard = "MasterCard",
  Paypal = "Paypal",
  CASH = "Cash",
}

const LogoAssets = {
  [PaymentMethod.MoMo]: "Images/MoMo_Logo.png",
  [PaymentMethod.Visa]: "Images/visa_logo.png",
  [PaymentMethod.MasterCard]: "Images/mastercard_logo.jpg",
  [PaymentMethod.Paypal]: "Images/paypal_logo.jpg",
  [PaymentMethod.CASH]: "Images/cash_logo.png",
};

const paymentMethods = [
  PaymentMethod.MoMo,
  PaymentMethod.Visa,
  PaymentMethod.MasterCard,
  PaymentMethod.Paypal,
  // PaymentMethod.CASH,
];
function SelectPaymentMethod({ next, setter }: StepProps & {}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  return (
    <div>
      <Paper elevation={3} className="w-[80%] p-5 min-w-[650px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl">Chọn hình thức thanh toán </h1>
          <div className="flex flex-wrap gap-5">
            {paymentMethods.map((method) => {
              return (
                <PaymentMethodButton
                  key={method}
                  isActive={paymentMethod === method}
                  paymentMethod={method}
                  setter={setPaymentMethod}
                />
              );
            })}
          </div>
          <Button
            onClick={() => {
              setter(paymentMethod);
              next();
            }}
            variant="contained"
          >
            Tiếp tục
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const PaymentMethodButton = ({
  isActive,
  setter,
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
  isActive: boolean;
  setter?: (value: PaymentMethod) => void;
}) => {
  return (
    <div
      onClick={() => {
        setter && setter(paymentMethod);
      }}
      className={`w-[100px] h-[100px] ${
        isActive ? "bg-slate-300/90" : "bg-slate-300/10 hover:bg-slate-300/50"
      } p-2 rounded-lg`}
    >
      <img src={`${LogoAssets[paymentMethod]}`} alt="" />
    </div>
  );
};

export default SelectPaymentMethod;
