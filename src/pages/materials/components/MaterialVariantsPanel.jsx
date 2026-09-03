import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetMaterials } from "../../../api/materials/getMaterials";

const MaterialVariantsPanel = ({ currentMaterial }) => {
    const { data: allMaterials } = useGetMaterials();

    const variants = React.useMemo(() => {
        if (!allMaterials || !currentMaterial) return [];
        const { idMaterial, parentId } = currentMaterial;
        return allMaterials.filter((m) => {
            if (m.idMaterial === idMaterial) return false;
            if (m.idMaterial === parentId) return true;
            if (m.parentId === idMaterial) return true;
            if (parentId != null && m.parentId === parentId) return true;
            return false;
        });
    }, [allMaterials, currentMaterial]);

    if (variants.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                No variants found.
            </Typography>
        );
    }

    return (
        <Box display="flex" flexWrap="wrap" gap={1}>
            {variants.map((v) => {
                const firstImage = v.images?.[0]?.imageUrl;
                return (
                    <Link
                        key={v.idMaterial}
                        to={`/material/${v.idMaterial}`}
                        state={{ material: v }}
                        style={{ textDecoration: "none" }}
                    >
                        <Card sx={{ width: 110, "&:hover": { boxShadow: 4 } }}>
                            <Box
                                sx={{
                                    height: 80,
                                    backgroundColor: "action.hover",
                                    backgroundImage: firstImage ? `url(${firstImage})` : "none",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            />
                            <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                                <Typography variant="caption" fontWeight="bold" noWrap display="block">
                                    {v.name || "—"}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    {v.cost != null ? `€${Number(v.cost).toFixed(2)}` : "—"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </Box>
    );
};

export default MaterialVariantsPanel;
