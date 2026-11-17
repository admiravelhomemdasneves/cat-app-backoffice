import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useUploadMaterialImage, useDeleteMaterialImage } from "../../../api/materials/uploadMaterialImage";

const GALLERY_HEIGHT = 280;
const THUMB_SIZE = 56;

const MaterialImageGallery = ({ images = [], materialId, onImageUploaded, onImageDeleted }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const fileInputRef = React.useRef(null);
    const { mutateAsync: uploadImage, isPending: uploading } = useUploadMaterialImage();
    const { mutateAsync: deleteImage, isPending: deleting } = useDeleteMaterialImage();

    React.useEffect(() => {
        if (currentIndex >= images.length && images.length > 0) {
            setCurrentIndex(images.length - 1);
        }
    }, [images.length, currentIndex]);

    const triggerUpload = () => fileInputRef.current?.click();

    const handleFileSelected = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const newImage = await uploadImage({ materialId, file });
            onImageUploaded(newImage);
            setCurrentIndex(images.length);
        } catch (err) {
            console.error("Image upload failed", err);
        }
        e.target.value = "";
    };

    const prev = (e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + images.length) % images.length); };
    const next = (e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % images.length); };

    const handleDelete = async (e) => {
        e.stopPropagation();
        const image = images[currentIndex];
        if (!image) return;
        try {
            await deleteImage(image.idMaterialImage);
            onImageDeleted(image.idMaterialImage);
            setCurrentIndex((i) => Math.max(0, i - 1));
        } catch (err) {
            console.error("Image delete failed", err);
        }
    };

    const slides = images.map((img) => ({ src: img.imageUrl }));

    return (
        <Box>
            <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelected}
            />

            <Box
                sx={{
                    position: "relative",
                    height: GALLERY_HEIGHT,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                    backgroundColor: "action.hover",
                    cursor: images.length > 0 ? "pointer" : "default",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={images.length > 0 ? () => setLightboxOpen(true) : undefined}
            >
                {images.length === 0 ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        px={2}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            No images to show. You can{" "}
                            <span
                                onClick={triggerUpload}
                                style={{ textDecoration: "underline", cursor: "pointer" }}
                            >
                                upload
                            </span>
                            {" "}them.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <img
                            src={images[currentIndex]?.imageUrl}
                            alt={`Material image ${currentIndex + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                        />
                        {images.length > 1 && (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={prev}
                                    sx={{
                                        position: "absolute", left: 8, top: "50%",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "rgba(0,0,0,0.45)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={next}
                                    sx={{
                                        position: "absolute", right: 8, top: "50%",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "rgba(0,0,0,0.45)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
                                    }}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                )}

                {images.length > 0 && (
                    <IconButton
                        size="small"
                        onClick={handleDelete}
                        disabled={deleting}
                        sx={{
                            position: "absolute", top: 8, right: 48,
                            backgroundColor: "rgba(0,0,0,0.45)",
                            color: "#fff",
                            opacity: hovered ? 1 : 0,
                            transition: "opacity 0.2s",
                            "&:hover": { backgroundColor: "rgba(180,0,0,0.65)" },
                        }}
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                )}

                <IconButton
                    size="small"
                    onClick={(e) => { e.stopPropagation(); triggerUpload(); }}
                    disabled={uploading}
                    sx={{
                        position: "absolute", top: 8, right: 8,
                        backgroundColor: "rgba(0,0,0,0.45)",
                        color: "#fff",
                        opacity: hovered ? 1 : 0,
                        transition: "opacity 0.2s",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
                    }}
                >
                    <FileUploadOutlinedIcon fontSize="small" />
                </IconButton>
            </Box>

            {images.length > 0 && (
                <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                    {images.map((img, idx) => (
                        <Box
                            key={img.idMaterialImage ?? idx}
                            onClick={() => setCurrentIndex(idx)}
                            sx={{
                                width: THUMB_SIZE,
                                height: THUMB_SIZE,
                                borderRadius: 1,
                                overflow: "hidden",
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: idx === currentIndex ? "primary.main" : "transparent",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={img.imageUrl}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                        </Box>
                    ))}
                </Box>
            )}

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={currentIndex}
                on={{ view: ({ index }) => setCurrentIndex(index) }}
                slides={slides}
                plugins={[Thumbnails]}
            />
        </Box>
    );
};

export default MaterialImageGallery;
