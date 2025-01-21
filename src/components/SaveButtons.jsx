import React from "react";
import { Button, Grid} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const SaveButtons = ({
    iconize = false,
    variant = "outlined",
    size="medium",
    miniStyle=false,
    onSave,
    onCancel
}) => {
    return (
        <Grid container spacing={miniStyle ? 2 : undefined} justifyContent="space-between" alignItems="center">
            {/* SAVE BUTTON */}
            <Grid item xs={6}>
                <Button
                    size={size}
                    variant={variant}
                    color="secondary"
                    onClick={onSave}
                    style={miniStyle ? {
                        minWidth: 'auto', // Remove default minWidth
                        padding: '4px',   // Adjust padding as needed
                        width: 'auto',    // Set width to auto
                        height: 'auto',   // Set height to auto
                    } : undefined }
                >
                    { iconize ? <SaveIcon/> : "Save" }
                </Button>
            </Grid>

            {/* CANCEL BUTTON */}
            <Grid item xs={6}>
                <Button
                    size={size}
                    variant={variant}
                    color="error"
                    onClick={onCancel}
                    style={miniStyle ? {
                        minWidth: 'auto', // Remove default minWidth
                        padding: '4px',   // Adjust padding as needed
                        width: 'auto',    // Set width to auto
                        height: 'auto',   // Set height to auto
                    } : undefined }
                >
                    { iconize ? <CloseIcon/> : "Cancel" }
                </Button>
            </Grid>
        </Grid>
    )
}

export default SaveButtons;