import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { useState } from "react";

const DataTable = ({ gridData, columnsDefinition, rowIdField, sampleRow, createHook, updateHook, deleteHook }) => {
    const [apiRef] = useState(useGridApiRef());
    const [rows, setRows] = useState(gridData);

    const deleteButton = (rowId) => {
        return (
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    deleteHook(rowId);
                }}
            />
        )
    };

    const columns = [
        ...columnsDefinition,
        {
            field: "actions",
            headerName: "",
            //type: "actions",
            resizable: false,
            filterable: false,
            sortable: false,
            hideable: false,
            renderCell: ({ row }) => {
                return deleteButton(row[rowIdField]);
            },
        },
    ];

    const handleAddRow = () => {
        //setRows((prevRows) => [...prevRows, sampleRow]);
        createHook(sampleRow);
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => {
                    handleAddRow();
                }}
            >
                Add Record
            </Button>
            <DataGrid
                apiRef={apiRef}
                rows={rows}
                columns={columns}
                getRowId={(row) => row[rowIdField]}
                onCellEditStop={(data) => { updateHook(apiRef.current.getRowWithUpdatedValues(data.id, data.field));}}
            />
        </>
    );
}

export default DataTable;