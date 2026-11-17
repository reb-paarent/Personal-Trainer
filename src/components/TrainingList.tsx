import { useState, useEffect } from "react";
import type { TrainingsWithCustomerData } from "../types";
import { GetTrainings, DeleteTraining } from "../api";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingsWithCustomerData[]>([]);
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date" },
    { field: "duration", headerName: "Duration" },
    { field: "activity", headerName: "Activity" },
    {
      field: "customerFirstName",
      headerName: "Customer First Name",
      valueGetter: (_value, row) => row.customer?.firstname ?? "",
    },
    {
      field: "customerLastName",
      headerName: "Customer Last Name",
      valueGetter: (_value, row) => row.customer?.lastname ?? "",
    },
    {
      field: "actions",
      headerName: " ",
      renderCell: (params: GridRenderCellParams<TrainingsWithCustomerData>) => (
        <IconButton
          onClick={() =>
            handleDelete(
              import.meta.env.VITE_API_URL + "/trainings/" + params.row.id,
            )
          }
        >
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const fetchTrainings = () => {
    GetTrainings()
      .then(setTrainings)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = (url: string) => {
    DeleteTraining(url)
      .then(() => {
        fetchTrainings();
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div style={{ width: "90%", height: 500, marginTop: 10 }}>
        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          disableRowSelectionOnClick
        />
      </div>
      <Snackbar
        open={open}
        message="Training deleted successfully"
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default TrainingList;
