import { FC, useState, useEffect } from "react";

import "./App.css";
import { weekdays } from "./weekdays";

const App: FC = () => {
  const [nav, setNav] = useState<number>(0);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadCalendar();
    const eventsFromLocalStorage: string | null =
      localStorage.getItem("events");
    if (eventsFromLocalStorage) {
      setEvents(JSON.parse(eventsFromLocalStorage));
    }
  }, []);

  const loadCalendar = (): void => {
    const date: Date = new Date();

    if (nav !== 0) {
      date.setMonth(new Date().getMonth() + nav);
    }

    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();

    const firstDayOfMonth: Date = new Date(year, month, 1);
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();

    const dateString: string = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays: number = weekdays.indexOf(dateString.split(", ")[0]);

    displayMonthAndYear(date, year);

    const calendar: HTMLElement | null = document.getElementById("calendar");
    if (calendar) {
      calendar.innerHTML = "";
      for (let index: number = 1; index <= paddingDays + daysInMonth; index++) {
        const daysSquare: HTMLDivElement = document.createElement("div");
        daysSquare.classList.add("day");
        if (index > paddingDays) {
          daysSquare.innerText = (index - paddingDays).toString();
          daysSquare.addEventListener("click", () => console.log("click"));
        } else {
          daysSquare.classList.add("padding");
        }
        calendar.appendChild(daysSquare);
      }
    }
  };

  const displayMonthAndYear = (date: Date, year: number): void => {
    const monthDisplay: HTMLElement | null =
      document.getElementById("monthDisplay");
    if (monthDisplay) {
      monthDisplay.innerText = `${date.toLocaleDateString("en-us", {
        month: "long",
      })} ${year}`;
    }
  };

  const handleBackButton = (): void => {
    setNav((prev: number) => prev - 1);
    loadCalendar();
  };

  const handleNextButton = (): void => {
    setNav((prev: number) => prev + 1);
    loadCalendar();
  };

  return (
    <div id="container">
      <div id="header">
        <div id="monthDisplay"></div>
        <div className="">
          <button id="backButton" onClick={handleBackButton}>
            Back
          </button>
          <button id="nextButton" onClick={handleNextButton}>
            Next
          </button>
        </div>
      </div>

      <div id="weekdays">
        {weekdays.map((weekday: string) => <div key={weekday}>{weekday}</div>)}
      </div>

      <div id="calendar"></div>
    </div>
  );
};

export default App;
