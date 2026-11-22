import { useState, useEffect } from "react";
import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent } from "@mui/x-scheduler/models";
import type { TrainingsWithCustomerData } from "../types";
import { GetTrainings } from "../api";

function Calendar() {
  const [trainings, setTrainings] = useState<TrainingsWithCustomerData[]>([]);

  const fetchTrainings = () => {
    GetTrainings()
      .then(setTrainings)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const events: SchedulerEvent[] = trainings.map((training) => {
    if (training.id == null) {
      throw new Error("Training is missing an id");
    }

    const start = new Date(training.date);
    const end = new Date(start.getTime() + training.duration * 60000);

    return {
      id: training.id,
      title: `${training.activity}: ${training.customer.firstname} ${training.customer.lastname}`,
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });

  return <EventCalendar events={events} defaultView="month" />;
}

export default Calendar;
