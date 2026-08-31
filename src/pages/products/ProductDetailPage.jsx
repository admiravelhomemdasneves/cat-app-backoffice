import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import ProductForm from "./components/ProductForm";
import { ProductDetailPageStore } from "./ProductDetailPageStore";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const { isPending, product, updateProduct } = ProductDetailPageStore(Number(id), state?.product ?? null);

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header title={`Product #${id}`} subtitle="View and manage product details" />
            <Box mb={3}>
                <Button
                    startIcon={<ArrowBackOutlinedIcon />}
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    size="small"
                >
                    Back
                </Button>
            </Box>
            <Paper sx={{ p: 3 }}>
                <ProductForm initialData={product} onChange={updateProduct} />
            </Paper>
        </Box>
    );
};

export default ProductDetailPage;
