import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import React from "react";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export type TrainingFormData = {
  date: string;
  duration: number;
  activity: string;
};

type TrainingFormProps = {
  training: TrainingFormData;
  setTraining: React.Dispatch<React.SetStateAction<TrainingFormData>>;
};

function TrainingForm({ training, setTraining }: TrainingFormProps) {
  return (
    <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date"
          format="DD.MM.YYYY HH:mm"
          value={training.date ? dayjs(training.date) : null}
          onChange={(value) =>
            setTraining((dateValue) => ({
              ...dateValue,
              date: value?.isValid() ? value.toISOString() : "",
            }))
          }
          slotProps={{
            textField: {
              required: true,
              margin: "dense",
              fullWidth: true,
              variant: "standard",
            },
          }}
        />
      </LocalizationProvider>
      <TextField
        required
        margin="dense"
        label="Duration"
        value={training.duration}
        onChange={(e) =>
          setTraining({ ...training, duration: Number(e.target.value) })
        }
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Activity"
        value={training.activity}
        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}

export default TrainingForm;
