import "./App.css";
import { useState, useEffect } from "react";


function App() {
  const [day, setDay] = useState({value: "", error: null});
  const [month, setMonth] = useState({value: "", error: null});
  const [year, setYear] = useState({value: "", error: null});
  const [calculatedAge, setCalculatedAge] = useState(null);

  const validateFormData = () => {
    const subBut = document.querySelector("button");
    const inputs = document.querySelector("input");
    const butTopValue = parseInt(getComputedStyle(subBut).top.replace(/[^0-9]/g, ''));

    console.log(butTopValue)
    const dayToInt = parseInt(day.value);
    const monthToInt = parseInt(month.value);
    const yearToInt = parseInt(year.value);

    let occurredErrors = 0;

    function isMonthValid(year, month, day) {
      const date = new Date(year, month - 1, day);
      const daysInMonth = new Date(year, month, 0).getDate();
      
      return (
        day <= daysInMonth &&
        new Date() > date
      )
    }

    if (day.value === "") {
       setDay({...day, error: "This field is required"});
       occurredErrors ++;
    }
    if (month.value === "") {
      setMonth({...month, error: "This field is required"});
      occurredErrors ++;
    }
    if (year.value === "") {
      setYear({...year, error: "This field is required"});
      occurredErrors ++;
    }

    if (dayToInt < 1 || dayToInt > 31) {
      setDay({...day, error: "Must be a valid day"});
      occurredErrors ++;
    }
    if (monthToInt < 1 || monthToInt > 12) {
      setMonth({...month, error: "Must be a valid month"});
      occurredErrors ++;
    }

    if (yearToInt > new Date().getFullYear()) {
      setYear({...year, error: "Must be in the past"});
      occurredErrors ++;
    }

    if (day.value !== "" && month.value !== "" && year.value !== "") {
      if(!isMonthValid(yearToInt, monthToInt, dayToInt)) {
        setDay({...day, error: "Must be a valid date"});
        occurredErrors ++;
      }
    }

    if (occurredErrors === 0) { 
      if(butTopValue === 105 || butTopValue === 85) subBut.style.top = (butTopValue - 15) + "px";

      getElapsedTime(dayToInt, monthToInt -1, yearToInt);
      setDay({...day, error: null});
      setMonth({...month, error: null});
      setYear({...year, error: null});
    } else {
      if(butTopValue === 90 || butTopValue === 70) subBut.style.top = (butTopValue + 15) + "px";

      setCalculatedAge(null);
    }
  }

  const getElapsedTime = (day, month, year) => {
    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dateNow = new Date();
    const dateInThePast = new Date(year, month, day);

    let daysDifference = Math.round((dateNow - dateInThePast) / 86400000);
    let monthsElapsed = 0;
    let yearsElapsed = 0;
    let currentYear = dateInThePast.getFullYear();

    while (daysDifference > 31) {
      for (let i = 0; i < daysInEachMonth.length; i++) {
          if (daysDifference > 31) {
              if (currentYear % 4 === 0 && i === 1) {
                  daysDifference = daysDifference - (daysInEachMonth[i] + 1)
                  monthsElapsed ++
              } else {
                  daysDifference = daysDifference - daysInEachMonth[i]
                  monthsElapsed ++
              }
              if(monthsElapsed > 11) {
                  yearsElapsed ++
                  monthsElapsed = 0
              }
          }
      }
      currentYear ++;
    }
    setCalculatedAge({
      day: daysDifference,
      month: monthsElapsed,
      year: yearsElapsed
    })
  }

  useEffect(() => {
    const dayField = document.querySelector(".day-field");
    const dayLabel = document.querySelector(".day-label");
    const monthField = document.querySelector(".month-field");
    const monthLabel = document.querySelector(".month-label");
    const yearField = document.querySelector(".year-field");
    const yearLabel = document.querySelector(".year-label");

    if (day?.error) {
      dayField.style.borderColor = "hsl(0, 100%, 67%)" 
      dayLabel.style.color = "hsl(0, 100%, 67%)"
    } else {
      dayField.style.borderColor = "hsl(0, 0%, 86%)"
      dayLabel.style.color = "hsl(0, 1%, 44%)"
    }

    if (month?.error) {
      monthField.style.borderColor = "hsl(0, 100%, 67%)" 
      monthLabel.style.color = "hsl(0, 100%, 67%)"
    } else {
      monthField.style.borderColor = "hsl(0, 0%, 86%)"
      monthLabel.style.color = "hsl(0, 1%, 44%)"
    }
    
    if (year?.error) {
      yearField.style.borderColor = "hsl(0, 100%, 67%)" 
      yearLabel.style.color = "hsl(0, 100%, 67%)"
    } else {
      yearField.style.borderColor = "hsl(0, 0%, 86%)"
      yearLabel.style.color = "hsl(0, 1%, 44%)"
    }

  }, [day, month, year]);

  return (
    <div className="calc-container">
      <form>
        <div className="form-field">
          <label className="day-label" htmlFor="day">DAY</label>
          <input className="day-field" placeholder="DD" id="day" value={day.value} onChange={(e) => setDay({...day, value: e.target.value})}/>
          {day.error && <span>{day.error}</span>}
        </div>
        <div className="form-field">
          <label className="month-label" htmlFor="month">MONTH</label>
          <input className="month-field" placeholder="MM" id="month" value={month.value} onChange={(e) => setMonth({...month, value: e.target.value})}/>
          {month.error && <span>{month.error}</span>}
        </div>
        <div className="form-field last-input">
          <label className="year-label" htmlFor="year">YEAR</label>
          <input className="year-field" placeholder="YYYY" id="year" value={year.value} onChange={(e) => setYear({...year, value: e.target.value})}/>
          {year.error && <span>{year.error}</span>}
        </div>
        <button type="button" onClick={validateFormData}>
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
        </button>
      </form>
      <div className="displayer">
        <p><span>{calculatedAge?.year >= 0 ? calculatedAge.year : "--"}</span> years</p>
        <p><span>{calculatedAge?.month >= 0 ? calculatedAge.month : "--"}</span> months</p>
        <p><span>{calculatedAge?.day >= 0 ? calculatedAge.day : "--"}</span> days</p>
      </div>
    </div>
  );
}

export default App;