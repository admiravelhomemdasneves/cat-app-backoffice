import React, { useState } from "react";
import { Box, Popover, Typography, Tooltip } from "@mui/material";

const PRESET_COLORS = [
    '#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5',
    '#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50',
    '#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800',
    '#FF5722','#795548','#9E9E9E','#607D8B','#212121',
];

const ColorPickerCell = ({ value, onChange }) => {
    const [anchor, setAnchor] = useState(null);

    const handleOpen = (e) => setAnchor(e.currentTarget);
    const handleClose = () => setAnchor(null);

    const handleSelect = (hex) => {
        onChange?.(hex);
        handleClose();
    };

    return (
        <>
            <Box
                onClick={handleOpen}
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    cursor: "pointer",
                    px: 1,
                    py: 0.5,
                    border: "1px solid rgba(0,0,0,0.23)",
                    borderRadius: 1,
                    minWidth: 90,
                    height: 40,
                    "&:hover": { borderColor: "text.primary" },
                }}
            >
                <Box sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "3px",
                    backgroundColor: value || "transparent",
                    border: "1px solid rgba(0,0,0,0.2)",
                    flexShrink: 0,
                }} />
                <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
                    {value || "None"}
                </Typography>
            </Box>

            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Box sx={{ p: 1.5, width: 196 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0.5, mb: 1 }}>
                        {PRESET_COLORS.map((hex) => (
                            <Tooltip key={hex} title={hex} placement="top" arrow>
                                <Box
                                    onClick={() => handleSelect(hex)}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "4px",
                                        backgroundColor: hex,
                                        border: value === hex ? "2px solid #000" : "1px solid rgba(0,0,0,0.15)",
                                        cursor: "pointer",
                                        transition: "transform 0.1s",
                                        "&:hover": { transform: "scale(1.2)", zIndex: 1, position: "relative" },
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, borderTop: "1px solid rgba(0,0,0,0.1)", pt: 1 }}>
                        <Typography variant="caption" color="text.secondary">Custom</Typography>
                        <input
                            type="color"
                            value={value || "#ffffff"}
                            onChange={(e) => onChange?.(e.target.value)}
                            style={{ width: 32, height: 26, border: "none", padding: 0, cursor: "pointer", borderRadius: "4px" }}
                        />
                        <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                            {value || "—"}
                        </Typography>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default ColorPickerCell;
