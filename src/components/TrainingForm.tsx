import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { TrainingsWithCustomerData } from "../types";
import React from "react";

type TrainingFormProps = {
  training: TrainingsWithCustomerData;
  setTraining: React.Dispatch<
    React.SetStateAction<TrainingsWithCustomerData>
  >;
};

function TrainingForm({ training, setTraining }: TrainingFormProps) {
  return (
    <DialogContent>
      <TextField
        required
        margin="dense"
        label="Date"
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
      <TextField
        required
        margin="dense"
        label="Customer"
        value={training.customer.firstname}
        onChange={(e) =>
          setTraining((prev) => ({
            ...prev,
            customer: { ...prev.customer, firstname: e.target.value },
          }))
        }
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Customer"
        value={training.customer.lastname}
        onChange={(e) =>
          setTraining((prev) => ({
            ...prev,
            customer: { ...prev.customer, lastname: e.target.value },
          }))
        }
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}

export default TrainingForm;