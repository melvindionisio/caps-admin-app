import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
//import { Button } from "@mui/material";
//import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
   root: {
      background: "white",
   },
});
export default function BoardingHouseTable({ data }) {
   //const history = useHistory();
   const classes = useStyles();
   const columns = [
      { field: "id", headerName: "ID", width: 100 },
      {
         field: "name",
         headerName: "Name",
         width: 200,
      },
      {
         field: "ownerName",
         headerName: "Owner",
         width: 190,
      },
      {
         field: "street",
         headerName: "Street",
         width: 150,
      },
      {
         field: "zone",
         headerName: "Barangay-Zone",
         width: 150,
      },
      {
         field: "address",
         headerName: "Full Address",
         sortable: false,
         width: 250,
         valueGetter: (params) =>
            `${params.getValue(params.id, "street") || ""} ${
               params.getValue(params.id, "zone") || ""
            }`,
      },
      {
         field: "contacts",
         headerName: "Contacts",
         width: 200,
      },

      //{
      //field: "",
      //headerName: "Action",
      //sortable: false,
      //disableClickEventBubbling: true,
      //width: 130,
      //renderCell: (params) => {
      //return (
      //<Button
      //color="secondary"
      //variant="outlined"
      //disableElevation
      //style={{ margin: "0 auto" }}
      //onClick={() =>
      //history.push(`/boardinghouse/${params.row.id}`)
      //}
      //>
      //Edit
      //</Button>
      //);
      //},
      //},
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
