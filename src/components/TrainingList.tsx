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
    {
      field: "date",
      headerName: "Date",
      width: 150,

      //AI was used to fix syntax issues with data formatting.
      valueFormatter: (value: string) => {
        if (!value) return "";

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        })
          .format(date)
          .replaceAll("/", ".")
          .replace(",", "");
      },
    },
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
      sortable: false,
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

  // Delete training
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
      <div
        id="list_contents"
        style={{ width: "90%", height: 500, marginTop: 10 }}
      >
        <h2 id="training_top">Trainings</h2>
        <DataGrid
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
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
