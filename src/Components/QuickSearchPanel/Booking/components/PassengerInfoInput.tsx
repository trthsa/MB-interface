//create a passenger info input component using mui paper
// Compare this snippet from src\components\QuickSearchPanel\Booking\components\PassengerInfoInput.tsx:
import { Button, Paper, TextField } from "@mui/material";
import { useRef } from "react";
import { StepProps } from "..";

export default function PassengerInfoInput({ next, setter }: StepProps & {}) {
  //input email,phone,ccid
  const refEmail = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  const refCCID = useRef<HTMLInputElement>(null);
  return (
    <Paper elevation={3} className="w-[80%] p-5">
      {/* //input email,phone,ccid */}

      <div className="flex flex-col gap-5">
        <h1 className="text-xl">Bạn hãy nhập thông tin</h1>
        <TextField
          inputRef={refEmail}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="w-full"
        />
        <TextField
          inputRef={refPhone}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          className="w-full"
        />
        <TextField
          inputRef={refCCID}
          id="outlined-basic"
          label="CCID"
          variant="outlined"
          className="w-full"
        />
        <Button
          onClick={() => {
            setter({
              email: refEmail.current?.value || "",
              phone: refPhone.current?.value || "",
              ccid: refCCID.current?.value || "",
            });
            next();
          }}
          variant="contained"
        >
          Tiếp tục
        </Button>
      </div>
    </Paper>
  );
}
