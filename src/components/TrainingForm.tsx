import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import React from "react";

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
      <TextField
        required
        margin="dense"
        label="Date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={training.date}
        onChange={(e) =>
          setTraining({ ...training, date: e.target.value })
        }
        fullWidth
        variant="standard"
      />
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
        onChange={(e) =>
          setTraining({ ...training, activity: e.target.value })
        }
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}

export default TrainingForm;