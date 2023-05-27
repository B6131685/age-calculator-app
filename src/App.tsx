import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import InputNumber from "./components/input-number/input-number";
import arrow from "../public/icon-arrow.svg";
import Result from "./components/result/result";
import moment from "moment";
import "./App.css";
function App() {
  const ListofDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const ref = useRef<HTMLInputElement | null>(null);
  const [day, setDay] = useState<number>(0);
  const [month, setMounth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [resultDay, setResultDay] = useState<number>(0);
  const [resultMonth, setResultMonth] = useState<number>(0);
  const [resultYear, setResultYear] = useState<number>(0);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const resetResult = ()=>{
    setResultDay(0)
    setResultMonth(0)
    setResultYear(0)
  }  

  const errorDay = () =>{
    setError("day", {
      type: "manual",
      message: "must be a valid mounth",
    })
    resetResult();
  };

  const errorYear = ()=>{
    setError("year", {
      type: "manual",
      message: "must be in past",
    });
    resetResult();
  }

 
  const onSubmit = async (data: any) => {

    if (day && year && month && ListofDays[month - 1]) {
      if (month === 2) {
        //Check Leap Year
        if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
          if (day > 29) {
            errorDay();
            return;
          }
        } else if (day > 28) {
          errorDay();
          return;
        }
      } else if (day > ListofDays[month - 1]) {
        errorDay();
        return;
      }
    }

    if (year && new Date().getFullYear() < year) {
      errorYear();
      return;
    }

    const a = moment();
    const b = moment(`${String(year).padStart(4, "0")}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`);
    const period = moment.duration(a.diff(b));
    setResultDay(period.days());
    setResultMonth(period.months());
    setResultYear(period.years());
  };

  return (
    <>
      <div className="container">
        <form className="layout_form" onSubmit={handleSubmit(onSubmit)}>
          <InputNumber
            label="day"
            value={String(day).padStart(2, "0")}
            placeholder="DD"
            onChange={(e) => {
              setDay(Number(e.target.value));
            }}
            register={{
              ...register("day", {
                required: { value: true, message: "this field is required" },
              }),
            }}
            error={errors.day?.message}
          />
          <InputNumber
            value={String(month).padStart(2, "0")}
            label="month"
            placeholder="MM"
            min={1}
            max={12}
            onChange={(e) => {
              setMounth(Number(e.target.value));
            }}
            register={{
              ...register("month", {
                required: { value: true, message: "this field is required" },
                max: { value: 12, message: "must be a valid mounth" },
                min: { value: 1, message: "must be a valid mounth" },
              }),
            }}
            error={errors.month?.message}
          />
          <InputNumber
            value={String(year).padStart(4, "0")}
            label="year"
            placeholder="YYYY"
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
            register={{
              ...register("year", {
                required: { value: true, message: "this field is required" },
              }),
            }}
            error={errors.year?.message}
          />
          <input style={{ display: "none" }} type="submit" ref={ref} />
        </form>
        <div className="divider">
          <div
            className="logo"
            onClick={() => {
              if (ref.current) {
                ref.current.click();
              }
            }}
          >
            <img src={arrow} alt="arrow-icon" />
          </div>
          <hr />
        </div>
        <div className="result">
          <Result value={resultYear ?? 0} unit="years" />
          <Result value={resultMonth ?? 0} unit="months" />
          <Result value={resultDay ?? 0} unit="days" />
        </div>
      </div>
    </>
  );
}

export default App;
