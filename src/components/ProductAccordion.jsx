import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Grid, Divider, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import { tokens } from "../theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Services from "../api/services";
import { EDITABLE_FIELD_TYPES } from "../util/Constants";
import EditableField from "../components/EditableField";
import OrderDetailsStore from "../stores/OrderDetailsStore";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductAccordion = ({
    idProduct,
    SaveProductRequest,
    SavePrintingServiceRequest,
    RefreshParentData,
    SaveSpecsRequest,
    isEditing,
    onSave,
    onDelete, 
    onEdit,
    onCancel
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderProduct, setOrderProduct] = useState([]);
    const [orderProductSpecs, setOrderProductSpecs] = useState([]);
    const [printingServices, setPrintingServices] = useState([]);
    const [products, setProducts] = useState([]);

    const [tipoProduto, setTipoProduto] = useState("");
    const [tipoImpressao, setTipoImpressao] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        fetchData();
        fetchOptions();
    }, [[idProduct]]); // This effect runs only once on mount

    useEffect(() => {
        setTipoProduto(orderProduct.product ? orderProduct.product.productType + " - " + orderProduct.product.brand + " - " + orderProduct.product.name : "N/A");
        setTipoImpressao(orderProduct.printingService && orderProduct.printingService.name ? orderProduct.printingService.name : "N/A");
        setDescricao(orderProduct.description ? orderProduct.description : "Sem descrição");
    }, [orderProduct]); // This effect runs when orderProduct changes

    const fetchData = async () => {
        const orderProductFetch = await Services.FindRequestById(Services.GET_ID_ORDER_PRODUCT, idProduct);
        const orderProductSpecsFetch = await Services.FindAllRequest(Services.GET_ALL_ORDER_PRODUCTS_SPECS);
        const filteredSpecs = orderProductSpecsFetch.filter(object => object.orderProduct && object.orderProduct.id_order_product === idProduct);

        setOrderProduct(orderProductFetch);
        setOrderProductSpecs(filteredSpecs);
    };

    const fetchOptions = async () => {
        const printingServicesFetch = await Services.FindAllRequest(Services.GET_ALL_PRINTING_SERVICE);
        const productTypesFetch = await Services.FindAllRequest(Services.GET_ALL_PRODUCTS);
        setPrintingServices(printingServicesFetch);
        setProducts(productTypesFetch);
    };

    const handleDeleteOrderProduct = async () => {
        if (orderProduct && orderProduct.id_order_product) {
            await Services.DeleteRequest(Services.DELETE_ID_ORDER_PRODUCT, orderProduct.id_order_product);
            await RefreshParentData();
            setOrderProduct(null); // Clear the state after deletion to prevent accessing deleted product
        }
    }

    const deleteOrderProductSpec = (id) => {
        if (id !== null)
        {

        }
    }

    const renderProductSpecs = () => {
        return orderProductSpecs.map((spec, index) => {
            if (spec.flagStatus !== "1") {
                return null; // Skip this entry if flagStatus is not 1
            }

            const quantidade = spec && spec.quantity ? spec.quantity : "0";
            const cor = spec && spec.color ? spec.color : "N/A";
            const tamanho = spec && spec.size ? spec.size : "N/A";

            return (
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton 
                            size="small" 
                            aria-label="add" 
                            color={colors.grey[100]} 
                            style={{ marginTop: '-4px' }}
                            onClick={deleteOrderProductSpec(spec && spec.id_order_product_specs ? spec.id_order_product_specs : null)}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Grid>

                    <Grid item xs={3}>
                        <Box display="flex">
                            <Typography key={index} color={colors.grey[100]} variant="standard"> <span style={{ marginRight: "10px" }}>●</span></Typography>
                            <EditableField
                                FieldType={EDITABLE_FIELD_TYPES.NUMBERED_TEXTFIELD}
                                Content={quantidade}
                                SaveRequest={OrderDetailsStore.UpdateProductSpecsQuantity}
                                UpdateDataRequest={fetchData}
                                ParentObjectId={spec.id_order_product_specs}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box display="flex">
                            <Typography key={index} color={colors.grey[100]} variant="h5"> 
                                <span style={{ marginRight: "10px" }}></span> - 
                                <span style={{ marginRight: "10px" }}></span> 
                            </Typography>
                            <EditableField
                                FieldType={EDITABLE_FIELD_TYPES.TEXTFIELD}
                                Content={tamanho}
                                SaveRequest={OrderDetailsStore.UpdateProductSpecsSize}
                                UpdateDataRequest={fetchData}
                                InlineButtons={true}
                                ParentObjectId={spec.id_order_product_specs}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box display="flex">
                            <Typography key={index} color={colors.grey[100]} variant="h5"> 
                                <span style={{ marginRight: "10px" }}></span> - 
                                <span style={{ marginRight: "10px" }}></span> 
                            </Typography>

                            <EditableField
                                FieldType={EDITABLE_FIELD_TYPES.TEXTFIELD}
                                Content={cor}
                                SaveRequest={OrderDetailsStore.UpdateProductSpecsColor}
                                UpdateDataRequest={fetchData}
                                InlineButtons={true}
                                ParentObjectId={spec.id_order_product_specs}
                            />
                        </Box>
                    </Grid>
                </Grid>
            );
        });
    };

    return (
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor:colors.primary[400], borderRadius:"6px"}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <IconButton 
                    size="small" 
                    aria-label="add" 
                    color={colors.grey[100]} 
                    style={{ marginTop: '-4px' }}
                    onClick={handleDeleteOrderProduct}
                >
                    <DeleteIcon fontSize="small"/>
                </IconButton>

                <Typography variant="h5"> 
                        <span style={{ fontWeight: 'bold' }}> #{idProduct} </span> 
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{borderRadius:"6px"}}>
                <Grid container>
                    {/* PRODUCT INFO */}
                    <Grid item xs={10}>
                        <Grid container spacing={2}>
                            {/* PRINTING SERVICES */}
                            <Grid item xs={4} alignSelf={"end"}>
                                <Typography color={colors.grey[100]} variant="h4"> Impressão </Typography>
                            </Grid>
                            <Grid item xs={8} alignSelf={"end"} paddingRight={2}>
                                <EditableField
                                    FieldType={EDITABLE_FIELD_TYPES.AUTOCOMPLETE}
                                    Content={tipoImpressao}
                                    Options= {[{ label: 'Empty', id: null }, ...printingServices.map((printingService) => ({label: printingService.name, id: printingService.id_printing_service}))]}
                                    SaveRequest={SavePrintingServiceRequest}
                                    ParentObjectId={orderProduct.id_order_product}
                                    ModeFK={true}
                                    UpdateDataRequest={fetchData}
                                />
                            </Grid>

                            {/* PRODUCTS */}
                            <Grid item xs={4} alignSelf={"end"}>
                                <Typography color={colors.grey[100]} variant="h4"> Produto </Typography>
                            </Grid>
                            <Grid item xs={8} alignSelf={"end"} paddingRight={2}>
                                <EditableField
                                    FieldType={EDITABLE_FIELD_TYPES.AUTOCOMPLETE}
                                    Content={tipoProduto}
                                    Options= {[{label: "N/A", id: null}, ...products.map((product) => ({label: product.productType + " - " + product.brand + " - " + product.name, id: product.id_product}))]}
                                    SaveRequest={SaveProductRequest}
                                    ParentObjectId={orderProduct.id_order_product}
                                    ModeFK={true}
                                    UpdateDataRequest={fetchData}
                                />
                            </Grid>                            
                        </Grid>
                    </Grid>

                    {/* PRODUCT IMAGE */}
                    <Grid item xs={2}>
                        <img src={`../../assets/user.png`} alt="Product" style={{ width: '100%', height: 'auto' }} />
                    </Grid>

                    {/* QUANTITIES, COLOR & SIZES*/}
                    <Grid item xs={12}>
                        <Box pt={1} pb={1}>
                            <Divider/>
                        </Box>
                        <Box>
                            <Typography color={colors.grey[100]} variant="h4" gutterBottom> Quantidade - Tamanho - Cor </Typography>
                            <Box pl={2}>
                                {renderProductSpecs()}
                            </Box>
                        </Box>
                    </Grid>

                    {/* ORDER PRODUCT DESCRIPTION */}
                    <Grid item xs={12}>
                        <Box pt={1} pb={1}>
                            <Divider/>
                        </Box>
                        <Typography color={colors.grey[100]} variant="h4"> Descrição </Typography>
                        <EditableField
                            FieldType={EDITABLE_FIELD_TYPES.TEXTFIELD}
                            Content={descricao}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default ProductAccordion;