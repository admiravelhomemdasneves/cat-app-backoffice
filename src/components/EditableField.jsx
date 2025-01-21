import React, { useState, useEffect } from "react";
import { useTheme, Typography, Box, Autocomplete, TextField, IconButton, InputAdornment } from "@mui/material";
import { tokens } from "../theme";
import { EDITABLE_FIELD_TYPES } from "../util/Constants";
import SaveButtons from "./SaveButtons";
import { Add, Remove } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';

const EditableField = ({
    Content, 
    FieldType, 
    Options,
    SaveRequest,
    ModeFK = false, //TRUE when saving Foreign Keys
    UpdateDataRequest,
    ParentObjectId,
    Editable = true,
    OptionsSizeVariant = "standard",
    TextSizeVariant = "standard",
    InlineButtons = false
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(Content);
    const [newContent, setNewContent] = useState();

    const handleClick = () => {
        if (!isEditing) {
            setIsEditing(true); // Set isEditing to true
        }
    };

    const saveOrder = async (value, modeFK, stopEditing = true) => {
        if (modeFK)
        {
            if (isEditing) {
                if (value && value.label) {
                    setContent(value.label);

                    if (SaveRequest && ParentObjectId) {
                        await SaveRequest(value.id, ParentObjectId); //FOR FOREIGN KEYS -> Sends the Id of the new FK and the PK of the object being updated

                        if (UpdateDataRequest)
                        {
                            //UPDATES DATA DEPENDENT ON THIS CHANGE, IF THERE IS ANY
                            await UpdateDataRequest();
                        }
                    }

                    if (stopEditing)
                    {
                        setIsEditing(false);
                    }
                }
            }
        }
        else
        {
            if (isEditing) {
                if (value) {
                    setContent(value);

                    if (SaveRequest && ParentObjectId) {
                        await SaveRequest(value, ParentObjectId); //FOR NORMAL VALUES

                        if (UpdateDataRequest)
                        {
                            //UPDATES DATA DEPENDENT ON THIS CHANGE, IF THERE IS ANY
                            await UpdateDataRequest();
                        }
                    }   

                    if (stopEditing)
                        {
                            setIsEditing(false);
                        }
                }
            }
        }
    }

    useEffect(() => {
        setContent(Content ? Content : "");
    }, [Content]);

    return (
        <Box
            onClick={handleClick}
            width="100%"  // Ensure the Box takes full width of its parent
        >
            {isEditing && Editable ? (
                // If editing is TRUE and content is EDITABLE
                (() => {
                    switch (FieldType) {
                        case EDITABLE_FIELD_TYPES.AUTOCOMPLETE:
                            return (
                                <Box sx={{backgroundColor: colors.primary[400],}}>
                                    <Autocomplete
                                        openOnFocus
                                        defaultValue={content ? content : ""}
                                        options={Options}
                                        onChange={async (event, newValue) => {
                                            saveOrder(newValue, ModeFK);
                                        }}
                                        onClose={() => {
                                            if (isEditing) {
                                                setIsEditing(false);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                inputRef={input => input && input.focus()} 
                                                variant={OptionsSizeVariant} 
                                            />
                                        )}
                                    />
                                </Box>
                            )
                        case EDITABLE_FIELD_TYPES.TEXTFIELD:
                            return (
                                <>
                                    <Box mb={1} sx={{
                                        backgroundColor: colors.primary[400],
                                    }}>
                                        <TextField
                                            id="order-description"
                                            fullWidth
                                            multiline
                                            maxRows={18}
                                            inputRef={input => input && input.focus()} 
                                            variant={TextSizeVariant}
                                            defaultValue={content}
                                            onChange={async (newValue) => {
                                                if (InlineButtons)
                                                {
                                                    saveOrder(newValue && newValue.target && newValue.target.value ? newValue.target.value : "", ModeFK, false);
                                                }
                                                else
                                                {
                                                    setNewContent(newValue && newValue.target && newValue.target.value ? newValue.target.value : " ");
                                                }
                                            }}
                                            InputProps={{
                                                inputProps: { min: 0 },
                                                ...(InlineButtons && {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton 
                                                                onClick={() => {
                                                                    setIsEditing(false);
                                                                }} 
                                                                size="small" 
                                                                aria-label="save"
                                                            >
                                                                <CheckIcon fontSize="small" />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                })
                                            }}
                                        />
                                    </Box>
                                    {!InlineButtons ? (
                                        <Box
                                            display="inline-flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <SaveButtons
                                                onSave={async () => {
                                                    saveOrder(newContent ? newContent : "", ModeFK);
                                                    setIsEditing(false);
                                                }}
                                                onCancel={() => {
                                                    setIsEditing(false);
                                                }}
                                            />
                                        </Box>
                                    ) : null}
                                </>
                            );
                        case EDITABLE_FIELD_TYPES.NUMBERED_TEXTFIELD:
                            return (
                                <Box mb={1} sx={{
                                    backgroundColor: colors.primary[400],
                                }}>
                                    <TextField
                                        id="order-description"
                                        fullWidth
                                        inputRef={input => input && input.focus()} 
                                        variant={TextSizeVariant}
                                        value={content}
                                        onChange={async (event) => {
                                            const newValue = event.target.value;
                                            if (/^\d*$/.test(newValue)) {
                                                setContent(newValue === "" ? 0 : Number(newValue));
                                                //saveOrder(newValue, ModeFK);
                                            }
                                        }}
                                        onClose={() => {
                                            if (isEditing) {
                                                setIsEditing(false);
                                            }
                                            saveOrder(content, ModeFK);
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === 'Escape') {
                                                setIsEditing(false);
                                            }
                                        }}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {/* 
                                                    <IconButton
                                                        onClick={() => {
                                                            setContent(prevContent => {
                                                                const newContent = prevContent <= 1 ? 0 : prevContent - 1;
                                                                //saveOrder(newContent, ModeFK);
                                                                return newContent;
                                                            });
                                                        }} 
                                                        size="small" 
                                                        aria-label="decrease"
                                                    >
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                    <IconButton 
                                                        onClick={() => {
                                                            setContent(prevContent => {
                                                                const newContent = prevContent < 0 ? 0 : prevContent + 1;
                                                                //saveOrder(newContent, ModeFK);
                                                                return newContent;
                                                            });
                                                        }} 
                                                        size="small" 
                                                        aria-label="increase"
                                                    >
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                    */}
                                                    <IconButton 
                                                        onClick={() => {
                                                            setIsEditing(false);
                                                        }} 
                                                        size="small" 
                                                        aria-label="increase"
                                                    >
                                                        <CheckIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            );
                        default:
                            return <></>; 
                    }
                })()
            ) : (          
                // If editing is FALSE or content is NOT EDITABLE      
                <Box sx={{
                    borderRadius: "6px",
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        // Box highlights when mouse hovers over it if content is EDITABLE
                        backgroundColor: Editable ? colors.primary[400] : null,
                    },
                }}>
                    <Typography fullWidth color={colors.grey[100]} variant={TextSizeVariant} justifyContent="center" style={{ wordWrap: "break-word" }}>
                        {content ? content : "Empty"}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default EditableField;