import React from "react";
import {Autocomplete, TextField, Box, Typography, Paper} from "@mui/material";

const AutocompleteImagePreview = ({products = [], value = null, onChange, width = 500, previewWidth = 220, ...props}) => {
    const [hoveredProduct, setHoveredProduct] = React.useState(null);
    
    return (
        <Autocomplete
            options={products}
            value={value}
            fullWidth
            getOptionLabel={(option) => option ? `${option.brand || ""} - ${option.name || ""}` : ""}
            isOptionEqualToValue={(option, val) => option.id_product === val?.id_product}
            onChange={(event, newValue) => {if (onChange) onChange(newValue);}}
            renderOption={(optionProps, option) => (
                <li
                    {...optionProps}
                    onMouseEnter={() => setHoveredProduct(option)}
                    style={{padding: "8px 12px", cursor: "pointer",}}
                >
                    {option.brand} - {option.name}
                </li>
            )}
            ListboxProps={{style: {maxHeight: 300, overflowY: "auto"}}}
            PaperComponent={(paperProps) => (
                <Paper
                    elevation={4}
                    sx={{display: "flex", width: width, borderRadius: 2}}
                    {...paperProps}
                >
                    {/* LEFT: LIST */}
                    <Box sx={{ flex: 1 }}> {paperProps.children} </Box>

                    {/* RIGHT: PREVIEW PANEL */}
                    <Box
                        sx={{
                            width: previewWidth,
                            borderLeft: "1px solid #e0e0e0",
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        {hoveredProduct?.imageUrl ? (
                            <img
                                src={hoveredProduct.imageUrl}
                                alt=""
                                style={{maxWidth: "100%", maxHeight: 180, objectFit: "contain",}}
                            />
                        ) : (
                            <Typography variant="body2" color="text.secondary"> No image </Typography>
                        )}
                    </Box>
                </Paper>
            )}
            renderInput={(params) => ( 
                <TextField {...params} size="small" /> )}
            {...props}
        />
    );
};

export default AutocompleteImagePreview;