import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TrainingForm, { type TrainingFormData } from "./TrainingForm";
import type { CustomerData } from "../types";

type AddTrainingProps = {
  customer: CustomerData;
};

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState<TrainingFormData>({
    date: "",
    duration: 0,
    activity: "",
  });

  const handleClickOpen = () => {
    setTraining({ date: "", duration: 0, activity: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const customerLink = props.customer._links?.self.href;

    fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...training, customer: customerLink }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong with adding training");
      })
      .then(handleClose);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#af93cf",
          color: "black"
        }}
        size="small"
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add Training for {props.customer.firstname} {props.customer.lastname}
        </DialogTitle>
        <TrainingForm training={training} setTraining={setTraining} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
