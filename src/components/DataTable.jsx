import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, useGridApiRef } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import { Button, alpha, useTheme, Modal, Paper, Box, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from "../theme";

const DataTable = ({ gridData, columnsDefinition, rowIdField, sampleRow, updateHook, deleteHook, onRowSelection, addRecordComponent = null, editRecordComponent = null, allowRowEditOnGrid = true }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [apiRef] = useState(useGridApiRef());
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const pendingAddRef = useRef(null);
    const pendingEditRef = useRef(null);

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
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} color="inherit" />,
                        <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
                    ];
                }

                return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
                ];
            },
        },
    ];

    const gridToolbar = () => (
        <GridToolbarContainer style={{ backgroundColor: colors.primary[500] }}>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                Add record
            </Button>
        </GridToolbarContainer>
    );

    // ---- ADD ----
    const handleAddRow = () => {
        if (addRecordComponent) {
            const id = Date.now() * 100000 + Math.floor(Math.random() * 100000);
            pendingAddRef.current = { ...sampleRow, [rowIdField]: id, isNew: true };
            setAddModalOpen(true);
        } else {
            const id = Date.now() * 100000 + Math.floor(Math.random() * 100000);
            const newRow = { ...sampleRow, [rowIdField]: id, isNew: true };
            setRows((prevRows) => [...prevRows, newRow]);
            setRowModesModel((oldModel) => ({ ...oldModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: columnsDefinition[0].field } }));
        }
    };

    const handleAddConfirm = () => {
        if (pendingAddRef.current) {
            updateHook(pendingAddRef.current);
            setRows((prevRows) => [...prevRows, pendingAddRef.current]);
        }
        setAddModalOpen(false);
        pendingAddRef.current = null;
    };

    const handleAddCancel = () => {
        setAddModalOpen(false);
        pendingAddRef.current = null;
    };

    // ---- EDIT ----
    const handleEditClick = (id) => () => {
        if (editRecordComponent) {
            const row = rows.find((r) => r[rowIdField] === id);
            pendingEditRef.current = { ...row };
            setEditModalOpen(true);
        } else {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        }
    };

    const handleEditConfirm = () => {
        if (pendingEditRef.current) {
            updateHook(pendingEditRef.current);
            setRows((prevRows) => prevRows.map((r) =>
                r[rowIdField] === pendingEditRef.current[rowIdField] ? pendingEditRef.current : r
            ));
        }
        setEditModalOpen(false);
        pendingEditRef.current = null;
    };

    const handleEditCancel = () => {
        setEditModalOpen(false);
        pendingEditRef.current = null;
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
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
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

    const modalContent = (children, onConfirm, onCancel) => (
        <Paper sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
        }}>
            <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
                {children}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 2, backgroundColor: colors.primary[500], flexShrink: 0 }}>
                <Button variant="outlined" color="inherit" startIcon={<CancelIcon />} onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" startIcon={<CheckIcon />} onClick={onConfirm}>Confirm</Button>
            </Box>
        </Paper>
    );

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
                //onProcessRowUpdateError={(error) => console.log("ERROR UPDATING ROW", error)}
                onRowSelectionModelChange={(newSelection) => {
                    const selectedRow = gridData.find(row => row[rowIdField] === newSelection[0]);
                    onRowSelection && onRowSelection(selectedRow || null);
                }}
                sx={{
                    backgroundColor: colors.primary[500],
                    '.MuiDataGrid-footerContainer': { backgroundColor: colors.primary[500] },
                    '.MuiDataGrid-row': { backgroundColor: alpha(colors.primary[500], 0.6) },
                    '& .MuiDataGrid-virtualScroller': { backgroundColor: alpha(colors.primary[500], 0.6) },
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.primary[500] },
                    '& .MuiDataGrid-columnHeader': { backgroundColor: colors.primary[500] },
                    '& .MuiDataGrid-filler': { backgroundColor: colors.primary[500] },
                }}
                isCellEditable={(params) => {
                    if (!allowRowEditOnGrid) return false;
                    return params.colDef.editable;
                }}
                onCellDoubleClick={(params, event) => {
                    if (!allowRowEditOnGrid) event.defaultMuiPrevented = true;
                }}
            />

            {/* ADD MODAL */}
            {addRecordComponent && (
                <Modal open={addModalOpen} onClose={handleAddCancel}>
                    {modalContent(
                        addRecordComponent({
                            initialData: pendingAddRef.current,
                            onChange: (updated) => { pendingAddRef.current = { ...pendingAddRef.current, ...updated }; }
                        }),
                        handleAddConfirm,
                        handleAddCancel
                    )}
                </Modal>
            )}

            {/* EDIT MODAL */}
            {editRecordComponent && (
                <Modal open={editModalOpen} onClose={handleEditCancel}>
                    {modalContent(
                        editRecordComponent({
                            initialData: pendingEditRef.current,
                            onChange: (updated) => { pendingEditRef.current = { ...pendingEditRef.current, ...updated }; }
                        }),
                        handleEditConfirm,
                        handleEditCancel
                    )}
                </Modal>
            )}
        </>
    );
}

export default DataTable;