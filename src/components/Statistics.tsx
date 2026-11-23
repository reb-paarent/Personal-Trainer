import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import type { TrainingsWithCustomerData } from "../types";
import { GetTrainings } from "../api";

function Statistics() {
  const [trainings, setTrainings] = useState<TrainingsWithCustomerData[]>([]);

  const fetchTrainings = () => {
    GetTrainings()
      .then(setTrainings)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const durationByActivity = new Map<string, number>();
  for (let i = 0; i < trainings.length; i++) {
    const training = trainings[i];
    const previousTotal = durationByActivity.get(training.activity);
    let total = 0;

    if (previousTotal !== undefined) {
      total = previousTotal;
    }

    total = total + training.duration;
    durationByActivity.set(training.activity, total);
  }

  const activities = Array.from(durationByActivity.keys());
  const durationTotals = Array.from(durationByActivity.values());

  return (
    <div id="stats_chart">
      <Box>
        <BarChart
          height={450}
          series={[
            {
              data: durationTotals,
              label: "Total Duration (Minutes)",
              id: "totalDuration",
              color: "#af93cf",
            },
          ]}
          xAxis={[{ data: activities, height: 28 }]}
          yAxis={[{ width: 50 }]}
        />
      </Box>
    </div>
  );
}

export default Statistics;
