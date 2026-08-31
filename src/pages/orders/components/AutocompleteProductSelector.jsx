import React from "react";
import { Autocomplete, TextField, Box, Typography, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function createPreviewEmitter() {
    let listener = null;
    return {
        subscribe: (fn) => { listener = fn; },
        unsubscribe: () => { listener = null; },
        emit: (item) => { listener?.(item); },
    };
}

const StablePaper = React.memo(function StablePaper(props) {
    const { children, emitter, width, previewWidth, onBack, onClose, stepLabel, ...paperProps } = props;
    const [hovered, setHovered] = React.useState(null);

    React.useEffect(() => {
        emitter.subscribe(setHovered);
        return () => emitter.unsubscribe();
    }, [emitter]);

    const previewContent = () => {
        if (!hovered) return <Typography variant="body2" color="text.secondary">No preview</Typography>;
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                {hovered.imageUrl ? (
                    <img src={hovered.imageUrl} alt="" style={{ maxWidth: "100%", maxHeight: 160, objectFit: "contain" }} />
                ) : hovered.colorCode ? (
                    <Box sx={{ width: 80, height: 80, borderRadius: 2, backgroundColor: hovered.colorCode, border: "1px solid rgba(0,0,0,0.15)", boxShadow: 2 }} />
                ) : (
                    <Typography variant="body2" color="text.secondary">No preview</Typography>
                )}
                {hovered.label && (
                    <Typography variant="caption" color="text.secondary" textAlign="center">{hovered.label}</Typography>
                )}
            </Box>
        );
    };

    return (
        <Paper elevation={4} sx={{ display: "flex", flexDirection: "column", width, borderRadius: 2, minHeight: 220 }} {...paperProps}>
            {/* Topbar */}
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                py: 0.75,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px 8px 0 0",
                flexShrink: 0,
            }}>
                <IconButton size="small" onMouseDown={(e) => e.preventDefault()} onClick={onBack} disabled={!onBack}>
                    <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                    {stepLabel}
                </Typography>
                <IconButton size="small" onMouseDown={(e) => e.preventDefault()} onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Main content */}
            <Box sx={{ display: "flex", flex: 1 }}>
                <Box sx={{ flex: 1 }}>{children}</Box>
                <Box sx={{
                    width: previewWidth,
                    height: 220,
                    borderLeft: "1px solid #e0e0e0",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    flexShrink: 0,
                }}>
                    {previewContent()}
                </Box>
            </Box>
        </Paper>
    );
});

const AutocompleteProductSelector = ({
    products = [],         // full flat ProductParameterDTO list
    distinctProducts = [], // deduplicated by idProduct
    distinctColorOptionsFormatter,
    distinctSizeOptionsFormatter,
    value = null,          // current resolved ProductParameterDTO (or distinctProduct entry)
    onChange,              // called with resolved ProductParameterDTO when size is picked
    width = 600,
    previewWidth = 250,
    ...props
}) => {
    const emitter = React.useMemo(() => createPreviewEmitter(), []);

    // Derive initial step state from existing value
    const initialProduct = value
        ? distinctProducts.find(p => p.idProduct === value.idProduct) ?? null
        : null;
    const initialColor = value?.colorCode
        ? { colorName: value.colorName ?? "N/A", colorCode: value.colorCode, imageUrl: value.imageUrl }
        : null;
    const initialSize = value?.size
        ? { id: value.idProductParameter, name: value.size, imageUrl: value.imageUrl }
        : null;

    const [step, setStep] = React.useState(1);
    const [selectedProduct, setSelectedProduct] = React.useState(initialProduct);
    const [selectedColor, setSelectedColor] = React.useState(initialColor);
    const [selectedSize, setSelectedSize] = React.useState(initialSize);
    const [isOpen, setIsOpen] = React.useState(false);
    const [committedValue, setCommittedValue] = React.useState(value);

    const handleBack = () => {
        if (step === 2) { setStep(1); setSelectedColor(null); setSelectedSize(null); }
        else if (step === 3) { setStep(2); setSelectedSize(null); }
    };

    const handleDiscard = () => {
        setStep(1);
        setSelectedProduct(initialProduct);
        setSelectedColor(initialColor);
        setSelectedSize(initialSize);
        setIsOpen(false);
    };

    const stepLabel = step === 1 ? "Select product" : step === 2 ? "Select color" : "Select size";

    const PaperComponent = React.useMemo(
        () => function PaperWithPreview(paperProps) {
            return (
                <StablePaper
                    {...paperProps}
                    emitter={emitter}
                    width={width}
                    previewWidth={previewWidth}
                    onBack={step > 1 ? handleBack : null}
                    onClose={handleDiscard}
                    stepLabel={stepLabel}
                />
            );
        },
        [emitter, width, previewWidth, step, stepLabel]  // ← step in deps so topbar updates
    );

    // Step 0/1 — product options
    const productOptions = distinctProducts;

    // Step 2 — color options derived from selected product
    const colorOptions = selectedProduct
        ? distinctColorOptionsFormatter(selectedProduct.idProduct)
        : [];

    // Step 3 — size options derived from selected product + color
    const sizeOptions = selectedProduct && selectedColor
    ? distinctSizeOptionsFormatter(selectedProduct.idProduct, selectedColor.colorCode)
    : [];

    const currentOptions = step <= 1 ? productOptions : step === 2 ? colorOptions : sizeOptions;

    const getOptionKey = (option) => {
        if (step <= 1) return option.idProduct;
        if (step === 2) return option.colorCode ?? "null";
        return option.id;
    };

    const getOptionLabel = (option) => {
        if (!option) return "";
        if (step <= 1) return option.name ?? "N/A";
        if (step === 2) return option.colorName ?? "N/A";
        return option.name ?? "N/A";
    };

    const handleChange = (_, newValue) => {
        if (!newValue) return;

        if (step <= 1) {
            setSelectedProduct(newValue);
            setSelectedColor(null);
            setSelectedSize(null);
            setStep(2);
            emitter.emit(null);
        } else if (step === 2) {
            setSelectedColor(newValue);
            setSelectedSize(null);
            setStep(3);
            emitter.emit(null);
        } else {
            setSelectedSize(newValue);
            const resolved = products.find(p =>
                p.idProduct === selectedProduct.idProduct &&
                (selectedColor.colorCode == null ? p.colorCode == null : p.colorCode === selectedColor.colorCode) &&
                (newValue.name === "N/A" ? !p.size : p.size === newValue.name)
            );
            onChange?.(resolved ?? null);
            setCommittedValue(resolved ?? null);  // ← update local display
            setIsOpen(false);
        }
    };

    return (
        <Autocomplete
            autoComplete
            fullWidth
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={(_, reason) => {
                if (reason === "blur") return;  // ← ignore blur
                if (reason === "selectOption" && step < 3) return;
                setStep(1);
                setSelectedProduct(initialProduct);
                setSelectedColor(initialColor);
                setSelectedSize(initialSize);
                setIsOpen(false);
            }}
            //disableCloseOnSelect
            options={currentOptions}
            value={null}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
            filterOptions={(options) => options}
            onChange={handleChange}
            onHighlightChange={(_, option) => {
                if (!option) { emitter.emit(null); return; }
                if (step <= 1) emitter.emit({ imageUrl: option.imageUrl, label: option.name });
                else if (step === 2) emitter.emit({ colorCode: option.colorCode, imageUrl: option.imageUrl, label: option.colorName });
                else emitter.emit({ imageUrl: option.imageUrl, label: option.name });
            }}
            ListboxProps={{ style: { maxHeight: 300, overflowY: "scroll" } }}
            PaperComponent={PaperComponent}
            renderOption={(optionProps, option) => {
                const key = getOptionKey(option);
                const label = getOptionLabel(option);
                return (
                    <li {...optionProps} key={key}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {step === 2 && (
                                <Box sx={{
                                    width: 14, height: 14, borderRadius: "3px",
                                    backgroundColor: option.colorCode || "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {!option.colorCode && (
                                        <Typography sx={{ fontSize: 8, color: "text.disabled", lineHeight: 1 }}>N/A</Typography>
                                    )}
                                </Box>
                            )}
                            {label}
                        </Box>
                    </li>
                );
            }}
            renderInput={(params) => {
                const displayValue = committedValue
                    ? [
                        committedValue.name,
                        committedValue.colorName,
                        committedValue.size
                    ].filter(Boolean).join(" - ")
                    : [
                        selectedProduct?.name,
                        selectedColor?.colorName,
                        selectedSize?.name
                    ].filter(v => v && v !== "").join(" - ") || "";

                return (
                    <TextField
                        {...params}
                        size="small"
                        placeholder="Select product..."
                        inputProps={{
                            ...params.inputProps,
                            value: isOpen ? params.inputProps.value : displayValue,
                        }}
                    />
                );
            }}
            {...props}
        />
    );
};

export default AutocompleteProductSelector;