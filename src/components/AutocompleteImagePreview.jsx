import React from "react";
import { Autocomplete, TextField, Box, Typography, Paper } from "@mui/material";

// A simple emitter to pass highlight changes into StablePaper without causing the PaperComponent reference to change.
function createPreviewEmitter() {
  let listener = null;
  return {
    subscribe: (fn) => { listener = fn; },
    unsubscribe: () => { listener = null; },
    emit: (product) => { listener?.(product); },
  };
}

const StablePaper = React.memo(function StablePaper(props) {
  const { children, emitter, width, previewWidth, ...paperProps } = props;
  const [hoveredProduct, setHoveredProduct] = React.useState(null);

  React.useEffect(() => {
    emitter.subscribe(setHoveredProduct);
    return () => emitter.unsubscribe();
  }, [emitter]);

  const previewContent = hoveredProduct?.imageUrl ? (
    <img
      src={hoveredProduct.imageUrl}
      alt=""
      style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain" }}
    />
  ) : (
    <Typography variant="body2" color="text.secondary">
      No image
    </Typography>
  );

  return (
    <Paper
      elevation={4}
      sx={{ display: "flex", width, borderRadius: 2, minHeight: 220 }}
      {...paperProps}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Box
        sx={{
          width: previewWidth,
          height: 220,
          borderLeft: "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        {previewContent}
      </Box>
    </Paper>
  );
});

const AutocompleteImagePreview = ({
  products = [],
  value = null,
  onChange,
  width = 500,
  previewWidth = 220,
  idField = null,
  ...props
}) => {
  // Emitter and PaperComponent are created once per mount.
  const emitter = React.useMemo(() => createPreviewEmitter(), []);

  const PaperComponent = React.useMemo(
    () =>
      function PaperWithPreview(paperProps) {
        return (
          <StablePaper
            {...paperProps}
            emitter={emitter}
            width={width}
            previewWidth={previewWidth}
          />
        );
      },
    [emitter, width, previewWidth]
  );

  return (
    <Autocomplete
      fullWidth
      autoComplete
      options={products}
      value={value}
      getOptionKey={(option) => option[idField]}
      getOptionLabel={(option) => option ? option.name : ""}
      isOptionEqualToValue={(option, val) => option[idField] === val?.[idField]}
      onChange={(_, newValue) => onChange?.(newValue)}
      onHighlightChange={(_, option) => emitter.emit(option ?? null)}
      ListboxProps={{ style: { maxHeight: 300, overflowY: "scroll" } }}
      PaperComponent={PaperComponent}
      renderInput={(params) => <TextField {...params} size="small" />}
      filterOptions={(options) => options}  // ← disable filtering, always show all options
      {...props}
    />
  );
};

export default AutocompleteImagePreview;