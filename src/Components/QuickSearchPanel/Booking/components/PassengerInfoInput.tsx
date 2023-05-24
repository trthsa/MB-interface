//create a passenger info input component using mui paper
// Compare this snippet from src\components\QuickSearchPanel\Booking\components\PassengerInfoInput.tsx:
import { Button, Paper, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { StepProps } from "..";
import { LocalGetter } from "../../../AccLogging/Login";

export default function PassengerInfoInput({ next, setter }: StepProps & {}) {
  const [user, setUser] = useState<any | null>();

  useEffect(() => {
    setUser(LocalGetter("user"));
  }, []);
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
          disabled={user?.email ? true : false}
          value={user?.email}
          inputRef={refEmail}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="w-full"
        />
        <TextField
          disabled={user?.email ? true : false}
          value={"0" + user?.exp}
          inputRef={refPhone}
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          className="w-full"
        />
        <TextField
          disabled={user?.email ? true : false}
          value={1}
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
