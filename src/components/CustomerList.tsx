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
import AddTraining from "./AddTraining";
import Button from "@mui/material/Button";
import { mkConfig, generateCsv, download } from "export-to-csv";

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
      field: "addTraining",
      headerName: " ",
      sortable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams<CustomerData>) => (
        <AddTraining customer={params.row} />
      ),
    },
    {
      field: "_links.customer.href",
      headerName: " ",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <EditCustomer fetchCustomers={fetchCustomers} customer={params.row} />
      ),
    },
    {
      field: "_links.self.href",
      headerName: " ",
      sortable: false,
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

  // Delete customer
  const handleDelete = (url: string) => {
    DeleteCustomer(url)
      .then(() => {
        fetchCustomers();
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  /* 
  This code exports customer data to a CSV file.
  The file is named customers.csv and excludes links and training data.
  */
  const csvConfig = mkConfig({
    filename: "customers",
    useKeysAsHeaders: true,
  });

  const exportCsv = () => {
    if (!customers?.length) return;

    const rows = customers.map(
      ({
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      }) => ({
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      }),
    );

    download(csvConfig)(generateCsv(csvConfig)(rows));
  };

  return (
    <>
      <div id="list_contents">
        <div id="customer_top">
          <h2 id="page_title">Customers</h2>
          <AddCustomer fetchCustomers={fetchCustomers} />
        </div>
        <DataGrid
          rows={customers || []}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          autoPageSize
          disableRowSelectionOnClick
        />
      </div>

      <div id="customer_export">
        <Button
          variant="contained"
          onClick={exportCsv}
          disabled={!customers?.length}
        >
          Export CSV file
        </Button>
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
