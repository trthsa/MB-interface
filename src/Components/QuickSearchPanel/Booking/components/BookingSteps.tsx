import { Step, StepLabel, Stepper } from "@mui/material";
const BookingStepsData = [
  "Chọn chuyến bay",
  "Thông tin hành khách",
  "Chọn hình thức hanh toán",
  "Xác nhận và thanh toán",
  "Hoàn tất & in vé"
];
function BookingSteps({ step }: { step: number }) {
  return (
    <div className="w-full">
      <Stepper activeStep={step} alternativeLabel>
        {BookingStepsData.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default BookingSteps;
