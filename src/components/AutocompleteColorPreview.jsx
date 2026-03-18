import React from "react";
import { Autocomplete, TextField, Box, Typography, Paper } from "@mui/material";

function createPreviewEmitter() {
    let listener = null;
    return {
        subscribe: (fn) => { listener = fn; },
        unsubscribe: () => { listener = null; },
        emit: (color) => { listener?.(color); },
    };
}

const StablePaper = React.memo(function StablePaper(props) {
    const { children, emitter, width, previewWidth, ...paperProps } = props;
    const [hovered, setHovered] = React.useState(null);

    React.useEffect(() => {
        emitter.subscribe(setHovered);
        return () => emitter.unsubscribe();
    }, [emitter]);

    const previewContent = () => {
        if (!hovered) return <Typography variant="body2" color="text.secondary">No selection</Typography>;

        // Prefer imageUrl if available
        if (hovered.imageUrl) {
            return (
                <img
                    src={hovered.imageUrl}
                    alt=""
                    style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain" }}
                />
            );
        }

        // Fall back to color swatch
        if (hovered.colorCode) {
            return (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        backgroundColor: hovered.colorCode,
                        border: "1px solid rgba(0,0,0,0.15)",
                        boxShadow: 2,
                    }} />
                    <Typography variant="caption" color="text.secondary">
                        {hovered.colorCode}
                    </Typography>
                </Box>
            );
        }

        return <Typography variant="body2" color="text.secondary">No preview</Typography>;
    };

    return (
        <Paper elevation={4} sx={{ display: "flex", width, borderRadius: 2 }} {...paperProps}>
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Box sx={{
                width: previewWidth,
                borderLeft: "1px solid #e0e0e0",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fafafa",
            }}>
                {previewContent()}
            </Box>
        </Paper>
    );
});

const AutocompleteColorPreview = ({
    colors = [],
    value = null,
    onChange,
    width = 350,
    previewWidth = 150,
    disabled = false,
    ...props
}) => {
    const emitter = React.useMemo(() => createPreviewEmitter(), []);

    const PaperComponent = React.useMemo(
        () => function PaperWithPreview(paperProps) {
            return <StablePaper {...paperProps} emitter={emitter} width={width} previewWidth={previewWidth} />;
        },
        [emitter, width, previewWidth]
    );

    return (
        <Autocomplete
            fullWidth
            autoComplete
            options={colors}
            value={value}
            disabled={disabled}
            getOptionKey={(option) => option.idColor}
            getOptionLabel={(option) => option?.colorName ?? ""}
            isOptionEqualToValue={(option, val) => option.idColor === val?.idColor}
            onChange={(_, newValue) => onChange?.(newValue)}
            onHighlightChange={(_, option) => emitter.emit(option ?? null)}
            ListboxProps={{ style: { maxHeight: 300, overflowY: "scroll" } }}
            PaperComponent={PaperComponent}
            renderOption={(props, option) => (
                <li {...props} key={option.idColor}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "3px",
                            backgroundColor: option.colorCode || "transparent",
                            border: "1px solid rgba(0,0,0,0.2)",
                            flexShrink: 0,
                        }} />
                        {option.colorName}
                    </Box>
                </li>
            )}
            renderInput={(params) => <TextField {...params} size="small" />}
            {...props}
        />
    );
};

export default AutocompleteColorPreview;