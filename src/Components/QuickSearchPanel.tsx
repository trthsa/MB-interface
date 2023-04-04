import { Button, FormControlLabel, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";

function QuickSearchPanel() {
  const [slKH, setSlKH] = useState(1);
  return (
    <div className="lite_g_border p-5 w-fit min-w-[400px] bg-white">
      <div className="text-2xl underline decoration-3 underline-offset-4 decoration-blue-400">
        Tra cứu nhanh
      </div>
      <div className="flex gap-2">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                //make this checkbox round

                checked
              />
            }
            label="Một chiều"
          />{" "}
          <FormControlLabel disabled control={<Checkbox />} label="Khứ hồi" />
        </FormGroup>
      </div>
      <div className="flex flex-col gap-5 my-3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-0 pt-5 p-b-3 px-2 py-2  border-[2px] border-slate-300/80 rounded-t-2xl">
            <TextField
              id="outlined-password-input"
              label="Điểm khởi hành"
              type="text"
              autoComplete="current-password"
              //make the boder of this more round
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "& fieldset": {
                    // paddingLeft: (theme) => theme.spacing(2.5),
                    borderRadius: "15px 0px 0px 0px",
                    borderColor: "transparent",
                  },

                  // "& input":{
                  //   padding: "none"
                  // }
                },
                "& label": {
                  //make it black and bold
                  color: "black",
                  fontWeight: "bold",
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "var(--primary-color)",
                },
              }}
            />{" "}
            <TextField
              id="outlined-password-input"
              label="Ngày đi"
              type="text"
              autoComplete="current-password"
              //make the boder of this more round
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "& fieldset": {
                    // paddingLeft: (theme) => theme.spacing(2.5),
                    borderRadius: "0px 15px 0px 0px",
                    borderColor: "transparent",
                  },

                  // "& input":{
                  //   padding: "none"
                  // }
                },
                "& label": {
                  //make it black and bold
                  color: "black",
                  fontWeight: "bold",
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "var(--primary-color)",
                },
              }}
            />
          </div>{" "}
          <div className="flex gap-0 p-b-3 pt-5 px-2 py-2 border-[2px] border-slate-300/80 rounded-b-2xl">
            <TextField
              id="outlined-password-input"
              label="Điểm đến"
              type="text"
              autoComplete="current-password"
              //make the boder of this more round
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "& fieldset": {
                    // paddingLeft: (theme) => theme.spacing(2.5),
                    borderRadius: "0px 0px 0px 15px",
                    borderColor: "transparent",
                  },

                  // "& input":{
                  //   padding: "none"
                  // }
                },
                "& label": {
                  //make it black and bold
                  color: "black",
                  fontWeight: "bold",
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "var(--primary-color)",
                },
              }}
            />{" "}
            <TextField
              id="outlined-password-input"
              label="Ngày về"
              type="text"
              autoComplete="current-password"
              //make the boder of this more round
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-color)",
                  },
                  "& fieldset": {
                    // paddingLeft: (theme) => theme.spacing(2.5),
                    borderRadius: "0px 0px 15px 0px",
                    borderColor: "transparent",
                  },

                  // "& input":{
                  //   padding: "none"
                  // }
                },
                "& label": {
                  //make it black and bold
                  color: "black",
                  fontWeight: "bold",
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "var(--primary-color)",
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-bold text-2xl opacity-80">Hành khách</span>
          <div className="flex gap-5 ">
            <Button
              onClick={() => {
                setSlKH(slKH + 1);
              }}
              size="small"
              variant="contained"
            >
              +
            </Button>
            <div className="text-2xl font-bold">{slKH}</div>
            <Button
              onClick={() => {
                if (slKH > 1) {
                  setSlKH(slKH - 1);
                }
              }}
              variant="contained"
            >
              -
            </Button>
          </div>
        </div>
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Mã khuyến mãi"
          type="text"
          autoComplete="current-password"
          //make the boder of this more round
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "var(--primary-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
              "& fieldset": {
                // paddingLeft: (theme) => theme.spacing(2.5),
                borderRadius: "15px",
                // borderColor: "transparent",
              },

              // "& input":{
              //   padding: "none"
              // }
            },
            "& label": {
              //make it black and bold
              // color: "black",
              // fontWeight: "bold",
              opacity: 0.8,
            },
            "& label.Mui-focused": {
              color: "var(--primary-color)",
            },
          }}
        />{" "}
      </div>
      <div className="flex justify-end">
        <Button
          size="large"
          variant="contained"
          sx={{
            //make border more round
            borderRadius: "15px",
            mt: 2,
          }}
        >
          Tìm chuyến bay
        </Button>
      </div>
    </div>
  );
}

export default QuickSearchPanel;
