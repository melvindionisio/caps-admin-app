import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const useStyles = makeStyles({
  root: {
    background: "white",
  },
});
export default function BoardingHouseTable({ data }) {
  const history = useHistory();
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "owner_name",
      headerName: "Owner",
      width: 190,
    },
    {
      field: "street",
      headerName: "Street",
      width: 150,
    },
    {
      field: "barangay",
      headerName: "Barangay",
      width: 150,
    },
    {
      field: "address",
      headerName: "Full Address",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.getValue(params.id, "street") || ""} ${
          params.getValue(params.id, "barangay") || ""
        }`,
    },
    {
      field: "",
      headerName: "Action",
      sortable: false,
      disableClickEventBubbling: true,
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            variant="outlined"
            disableElevation
            style={{ margin: "0 auto" }}
            onClick={() => history.push(`/boardinghouse/${params.row.id}`)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={columns}
        disableSelectionOnClick
        // pageSize={5}
      />
    </>
  );
}
