import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { CustomerData } from "../types";
import CustomerForm from "./CustomerForm";

type AddCustomerProps = {
  fetchCustomers: () => void;
};

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>({} as CustomerData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(import.meta.env.VITE_API_URL + "/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong in addition");

        return response.json();
      })
      .then(() => props.fetchCustomers());
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
