import { Typography, Box, Paper, Divider, useTheme } from "@mui/material";
import { tokens } from "../theme";

const EditablePaper = ({
    paperTitle,
    paperSubtitle,
    paperDescription
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Paper
        elevation="10" 
        sx={{
            bgcolor: colors.primary[400]
        }}>
            <Box p="20px">
                <Typography color={colors.grey[100]} variant="h2" gutterBottom>
                    {paperTitle}
                </Typography>
                <Divider />
                <Typography color={colors.grey[100]} mt="30px" variant="h3" gutterBottom>
                    {paperSubtitle}
                </Typography>
                <Typography color={colors.grey[100]} variant="h5" gutterBottom>
                    {paperDescription}
                </Typography>
            </Box>
        </Paper>
    )
}

export default EditablePaper;