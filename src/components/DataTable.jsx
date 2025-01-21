import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, useGridApiRef, GridRowEditStopReasons, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbar } from "@mui/x-data-grid";
import Header from "../components/Header";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from '@mui/icons-material/Add';

const DataTable = ({
    storeGet,
    storeDelete,
    storeSave,
    transformData,
    gridApiRef,
    idField,
    sampleRow,
    contentColumns,
    visibilityModel,
    pageTitle,
    pageSubtitle
}) => {
    const [data, setData] = useState([]);
    const [apiRef, setApiRef] = useState(useGridApiRef());
    const [editingRows, setEditingRows] = useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);  
    const isEditing = (id) => editingRows.includes(id);

    const actionButtons = (row) => {
      return (
        <Box>
          <Button
            variant={isEditing(row[idField]) ? "contained" : "text"}
            color={isEditing(row[idField]) ? "success" : "secondary"}
            startIcon={isEditing(row[idField]) ? <CheckIcon /> : <ModeEditIcon />}
            onClick={() => {
              isEditing(row[idField]) ? handleCancelEdit(true, row) : handleEdit(row[idField])}
            }
          />

          <Button
            variant={isEditing(row[idField]) ? "contained" : "text"}
            color={isEditing(row[idField]) ? "error" : "secondary"}
            startIcon={isEditing(row[idField]) ? <CloseIcon /> : <DeleteIcon />}
            onClick={() => {
              isEditing(row[idField]) ? handleCancelEdit(false, row) : handleDelete(row[idField]);
            }}
          />
        </Box>
      );
    }

    if (gridApiRef && apiRef !== gridApiRef) { setApiRef(gridApiRef); }
  
    useEffect(() => {
      fetchData(); // Fetch initial data or any other setup logic
    }, []); // Empty dependency array means this effect runs only once on mount
  
    const fetchData = async () => {
      await storeGet(setData);
    };
  
    const handleDelete = async (id) => {
        console.log("DELETING ID: ", id);
      await storeDelete(id);
      fetchData();
    };
  
    const handleEdit = (id) => {
        const keys = Object.keys(sampleRow); //We get the names of the keys of the object sampleRow

        console.log("Editing Row: ", id);
        // Implement your edit logic here
        setEditingRows([...editingRows, id]);
        apiRef.current.startRowEditMode({ id });
        apiRef.current.setCellFocus(id, keys[1]); //We set the second key as the cell to be focused on (the first one is the ID which can't be edited)
    };
  
    const handleCancelEdit = async (isSaving, row) => {
      const id = row[idField];
      const updatedRow = apiRef.current.getRowWithUpdatedValues(id);
  
      console.log("UPDATED ROW", updatedRow);
      
      // Implement your cancel edit logic here
      if (isSaving) {
        if (transformData) {
          const transformedRow = await transformData(updatedRow);
          await storeSave(transformedRow);
          fetchData();
        }
        else
        {
          await storeSave(updatedRow);
          fetchData();
        }
      }
      else
      {
        console.log("Canceling Edit on: ", id);
        fetchData();
      }

      apiRef.current.stopRowEditMode({id});
      setEditingRows(editingRows.filter((rowId) => rowId !== id)); //Remove from editingRows
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    const CustomToolbar = (props) => {
      const { setData } = props;
  
      const handleClick = () => {
        const newRow = sampleRow;
        setData((oldRows) => [...oldRows, newRow]);
        handleEdit(newRow[idField]);
      };
  
      return (
        <GridToolbarContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Box mt="10px">
              <GridToolbarColumnsButton />
              <GridToolbarFilterButton />
              <GridToolbarExport />
            </Box>
  
            <Box mb="10px">
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
              </Button>
            </Box>
          </Box>
        </GridToolbarContainer>
      );
    }
  
    const columns = [
      ...contentColumns,
      {
        field: "actions",
        headerName: "ACTIONS",
        width: 140,
        filterable: false,
        hideable: false,
        renderCell: ({ row }) => {
          return actionButtons(row);
        },
      },
    ];
  
    return (
      <Box m="20px">
        <Header title={ pageTitle } subtitle={ pageSubtitle } />
        <Box
          display="flex"
          m="10px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            editMode="row"
            apiRef={apiRef}
            columns={columns}
            rows={data}
            getRowId={(row) => row[idField]}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            slots={{ toolbar: CustomToolbar, GridToolbar }}
            slotProps={{ toolbar: { setData, setRowModesModel } }}
            initialState={{
              columns: {
                columnVisibilityModel: visibilityModel,
              },
            }}
            onRowEditStart={(row) => handleEdit(row.id)}
            onRowEditStop={(row, MuiEvent) => {
                if (row.reason === GridRowEditStopReasons.rowFocusOut) {
                  MuiEvent.defaultMuiPrevented = true;
                }
                else if (row.reason === GridRowEditStopReasons.tabKeyDown) {
                  MuiEvent.defaultMuiPrevented = true;
                }
                else if (row.reason === GridRowEditStopReasons.shiftTabKeyDown) {
                  MuiEvent.defaultMuiPrevented = true;
                }
                else if (row.reason === GridRowEditStopReasons.enterKeyDown) {
                  MuiEvent.defaultMuiPrevented = true;
                  handleCancelEdit(true, row.row);
                }
                else if (row.reason === GridRowEditStopReasons.escapeKeyDown) {
                  handleCancelEdit(false, row.row);
                }
              }}
          />
        </Box>
      </Box>
    );
}

export default DataTable;