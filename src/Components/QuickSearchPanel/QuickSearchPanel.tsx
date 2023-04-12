
import { Button, FormControlLabel, Paper, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AirPortItem, { AirPort } from "./components/AirPortItem";

enum InputCursor {
  DepartFrom,
  DepartTo,
  DepartDate,
  ReturnDate,
}

// const AirportList = ({
//   departLocationData,
// }: {
//   departLocationData: AirPort[];
// }) => {
//   return (
//     <Paper elevation={3} className="py-2">
//       {departLocationData.map((item) => (
//         <AirPortItem

//           key={item.id}
//           airport={item}
//           // onClick={() => setDepartFrom(item.name)}
//         />
//       ))}
//     </Paper>
//   );
// };

function QuickSearchPanel() {
  const [slKH, setSlKH] = useState(1);
  //TODO data for searching flight
  const [departFrom, setDepartFrom] = useState("");
  const [departTo, setDepartTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  //? State for inputs
  const [inputCursor, setInputCursor] = useState<InputCursor | null>(null);
  //TODO Deapart Data
  const [departLocationData, setDepartLocationData] = useState<AirPort[]>([]);

  //? Fetch data from API to get the list of airport
  const fetchDepartData = async () => {
    const res = await fetch("https://localhost:44379/api/AirPort/GetAll");
    const data = await res.json();
    setDepartLocationData(data);
  };

  useEffect(() => {
    fetchDepartData();
  }, []);

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
            <div className="relative">
              <TextField
                onFocus={() => {
                  setInputCursor(InputCursor.DepartFrom);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setInputCursor(null);
                  }, 300);
                }}
                label={departFrom || "Điểm khởi hành"}
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
              />
              <div
                className={`${
                  inputCursor == InputCursor.DepartFrom || "hidden"
                } shadow-lg absolute z-10 w-full max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-slate-500/20 scrollbar-thumb-black/10`}
              >
                {/* <AirportList departLocationData={departLocationData} /> */}
                <Paper elevation={3} className="py-2">
                  {departLocationData.map((item) => (
                    <AirPortItem
                      setter={setDepartFrom}
                      key={item.id}
                      airport={item}
                      // onClick={() => setDepartFrom(item.name)}
                    />
                  ))}
                </Paper>
              </div>
            </div>
            {/* <TextField
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
            /> */}
            <DatePicker />
          </div>{" "}
          <div className="flex gap-0 p-b-3 pt-5 px-2 py-2 border-[2px] border-slate-300/80 rounded-b-2xl">
            <div className="relative">
              <TextField
                onFocus={() => {
                  setInputCursor(InputCursor.DepartTo);
                }}
                onBlur={() =>
                  setTimeout(() => {
                    setInputCursor(null);
                  }, 300)
                }
                label={departTo || "Điểm đến"}
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
              <div
                className={`${
                  inputCursor == InputCursor.DepartTo || "hidden"
                } shadow-lg absolute z-10 w-full max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-slate-500/20 scrollbar-thumb-black/10`}
              >
                {/* <AirportList departLocationData={departLocationData} /> */}
                <Paper elevation={3} className="py-2">
                  {departLocationData.map((item) => (
                    <AirPortItem
                      setter={setDepartTo}
                      key={item.id}
                      airport={item}
                      // onClick={() => setDepartFrom(item.name)}
                    />
                  ))}
                </Paper>
              </div>
            </div>
            <DatePicker />
            {/* <TextField
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
            /> */}
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
          <Link to={"book"}>Tìm kiếm chuyến bay</Link>
        </Button>
      </div>
    </div>
  );
}

export default QuickSearchPanel;
