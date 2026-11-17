import { useState, useEffect } from "react";
import type { CustomerData } from "../types";
import { GetCustomers, DeleteCustomer } from "../api";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[] | null>();
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name" },
    { field: "lastname", headerName: "Last Name" },
    { field: "streetaddress", headerName: "Street Address" },
    { field: "postcode", headerName: "Post Code" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    {
      field: "_links.customer.href",
      headerName: " ",
      renderCell: (params: GridRenderCellParams) => (
        <EditCustomer fetchCustomers={fetchCustomers} customer={params.row} />
      ),
    },
    {
      field: "_links.self.href",
      headerName: " ",
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleDelete(params.row._links.self.href)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const fetchCustomers = () => {
    GetCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (url: string) => {
    DeleteCustomer(url)
      .then(() => {
        fetchCustomers();
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        id="list_contents"
        style={{ width: "90%", height: 500, marginTop: 10 }}
      >
        <div id="customer_top">
          <h2 id="page_title">Customers</h2>
          <AddCustomer fetchCustomers={fetchCustomers} />
        </div>
        <DataGrid
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          rows={customers || []}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          autoPageSize
          disableRowSelectionOnClick
        />
      </div>
      <Snackbar
        open={open}
        message="Customer deleted successfully"
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default CustomerList;
