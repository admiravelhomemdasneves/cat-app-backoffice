import { Box, Typography, useTheme, Grid, IconButton } from "@mui/material";
import { tokens } from "../theme";
import ProductPaper from "./ProductPaper";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductAccordion from "./ProductAccordion";
import Services from "../api/services";

const ProductsGrid = ({
    ListOfProducts,
    Order,
    FetchData,
    SaveProductRequest,
    SavePrintingServiceRequest,
    SaveSpecsRequest,
    OrderProductSampleRow
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productPapers, setProductPapers] = useState(ListOfProducts);
    const [isEditing, setIsEditing] = useState(false);
    const newID = "-1";

    useEffect(() => {
        setProductPapers(ListOfProducts);
    }, [ListOfProducts]);

    const handleAddProduct = async () => {
        OrderProductSampleRow.order = Order;
        await Services.SaveRequest(Services.PUT_ID_ORDER_PRODUCT, OrderProductSampleRow);
        await fetchData();
    };

    const fetchData = async () => {
        await FetchData();
        setProductPapers(ListOfProducts);
    }

    const handleDeleteProduct = (key) => {
        console.log("key:", key);

        setProductPapers(
            productPapers.filter((_) => {
                const id = _.orderProduct && _.orderProduct.id_order_product ? _.orderProduct.id_order_product : newID;
                return id !== key;
            })
        );
    };

    const handleEditProduct = (option) =>  {
        setIsEditing(option);
    }

    const handleCancelEditProduct = (option) =>  {
        //When canceling the edit action, Delete Product if it's a new entry that's never been saved before
        setIsEditing(false);

        if (option === newID)
        {
            handleDeleteProduct(newID);
        }
    }

    const handleSave = (option) =>  {
        setIsEditing(false);
    }

    return (
        <Box mt={4}>
            <Grid container spacing={1}>
                {/* HEADER TITLE */}
                <Grid item xs="auto">
                    <Typography variant="h5" color={colors.grey[100]} gutterBottom> 
                        <span style={{ fontWeight: 'bold' }}>List of Products</span> 
                    </Typography>
                </Grid>

                {/* HEADER ADD PRODUCT BUTTON */}
                <Grid item xs>
                    <IconButton 
                        size="small" 
                        aria-label="add" 
                        color={colors.grey[100]} 
                        style={{ marginTop: '-4px' }}
                        onClick={handleAddProduct}
                    >
                        <AddCircleOutlineIcon fontSize="small"/>
                    </IconButton>
                </Grid>
            </Grid>

            {/* PRODUCTS ENTRIES */}
            <Grid container spacing={2}>
                {productPapers.map((product) => (
                    <Grid item xl={12} md={12} sm={12} xs={12}>
                        <ProductAccordion
                            idProduct={product && product.orderProduct && product.orderProduct.id_order_product ? product.orderProduct.id_order_product : newID}
                            isEditing={isEditing}
                            SaveProductRequest={SaveProductRequest}
                            SavePrintingServiceRequest={SavePrintingServiceRequest}
                            SaveSpecsRequest={SaveSpecsRequest}
                            RefreshParentData={fetchData}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductsGrid;