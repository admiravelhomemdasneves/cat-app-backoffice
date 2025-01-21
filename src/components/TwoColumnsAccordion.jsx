import { useTheme, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import EditableField from "./EditableField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from "../theme";

const TwoColumnsAccordion = ({Title, Items}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
            sx={{backgroundColor:colors.primary[400], borderRadius:"6px"}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
                <Typography variant="h5"> 
                    <span style={{ fontWeight: 'bold' }}> { Title } </span> 
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{borderRadius:"6px"}}>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                pt={1}
                >
                    {Items.map((item) => (
                        <>
                            <Grid item xs={4}>  
                                <Typography variant="h6" justifyContent="center">
                                    <span> {item.Title} </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <EditableField
                                    Content={item.Content}
                                    FieldType={item.FieldType}
                                    Options={item.Options}
                                    SaveRequest={item.SaveRequest}
                                    UpdateDataRequest={item.UpdateDataRequest}
                                    ParentObjectId={item.ParentObjectId}
                                    Editable={item.Editable}
                                    ModeFK={item.ModeFK}
                                />
                            </Grid>
                        </>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default TwoColumnsAccordion;