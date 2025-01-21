import { Button, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditButtons = ({
    onDelete,
    onEdit
}) => {
    return (
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            {/* EDIT BUTTON */}
            <Grid item xs={6}>
                <Button 
                    size="small" 
                    variant="outlined" 
                    color="secondary"
                    onClick={onEdit}
                    style={{
                        minWidth: 'auto', // Remove default minWidth
                        padding: '4px',   // Adjust padding as needed
                        width: 'auto',    // Set width to auto
                        height: 'auto',   // Set height to auto
                    }}
                >
                    <EditIcon/>
                </Button>
            </Grid>

            {/* DELETE BUTTON */}
            <Grid item xs={6}>
                <Button 
                    size="small" 
                    variant="outlined" 
                    color="secondary"
                    onClick={onDelete}
                    style={{
                        minWidth: 'auto', // Remove default minWidth
                        padding: '4px',   // Adjust padding as needed
                        width: 'auto',    // Set width to auto
                        height: 'auto',   // Set height to auto
                    }}
                >
                    <DeleteIcon/>
                </Button>
            </Grid>
        </Grid>
    )
}

export default EditButtons;