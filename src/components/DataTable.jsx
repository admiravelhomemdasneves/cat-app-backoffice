import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, useGridApiRef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button, alpha, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { tokens } from "../theme";

const DataTable = ({ gridData, columnsDefinition, rowIdField, sampleRow, updateHook, deleteHook, onRowSelection }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [apiRef] = useState(useGridApiRef());
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(() => {
      gridData ? setRows(gridData) : setRows([]);
    }, [gridData]);

    const columns = [
        ...columnsDefinition,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'ACTIONS',
            width: 100,
            resizable: false,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                    color="inherit"
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
    ];

    const gridToolbar = () => {
        return (
            <GridToolbarContainer style={{ backgroundColor: colors.primary[500] }}
            >
                <Button 
                    color="primary"
                    startIcon={<AddIcon />} 
                    onClick={handleAddRow}
                >
                    Add record
                </Button>
            </GridToolbarContainer>
          );
    };

    const handleAddRow = () => {
        const id = Date.now() * 100000 + Math.floor(Math.random() * 100000);
        const newRow = { ...sampleRow, [rowIdField]: id, isNew: true };
        setRows((prevRows) => [...prevRows, newRow]);
        setRowModesModel((oldModel) => ({ ...oldModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: columnsDefinition[0].field }}));
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id) => () => {
        deleteHook(id);
    };
    
    const handleCancelClick = (id) => () => {
        const editedRow = rows.find((row) => row[rowIdField] === id);
        const newRows = rows.filter((row) => row[rowIdField] !== id);
        if (editedRow.isNew) { setRows(newRows); }
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true }});
    };
    
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow) => {
        updateHook(newRow);
        return newRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <>
            <DataGrid
                slots={{ toolbar: gridToolbar }}
                apiRef={apiRef}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                getRowId={(row) => row[rowIdField]}
                rows={rows}
                columns={columns}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => console.log("ERROR UPDATING ROW", error)}
                onRowSelectionModelChange={(newSelection) => {
                  const selectedRow = gridData.find(row => row[rowIdField] === newSelection[0]);
                  onRowSelection && onRowSelection(selectedRow || null);
                }}
                sx={{
                  '.MuiDataGrid-footerContainer': {
                    backgroundColor: colors.primary[500],
                  },
                  '.MuiDataGrid-row': {
                    backgroundColor: alpha(colors.primary[500], 0.6),
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: alpha(colors.primary[500], 0.6),
                  },
                }}
            />
        </>
    );
}

export default DataTable;