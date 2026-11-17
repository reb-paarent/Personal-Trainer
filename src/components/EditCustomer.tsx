import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { CustomerData } from '../types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CustomerForm from "./CustomerForm"

type EditCustomerProps = {
  fetchCustomers: () => void;
  customer: CustomerData;
}

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>({} as CustomerData);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(props.customer._links?.self.href || "", {
      method: 'PUT',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Something went wrong in addition");

      return response.json();
    })
    .then(() => props.fetchCustomers())
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color='primary' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}