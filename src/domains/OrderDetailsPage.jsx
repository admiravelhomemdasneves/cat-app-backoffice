import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme, Grid, TextField, IconButton, Autocomplete, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { tokens } from "../theme";
import { OrderDetailsStates }  from "../stores/OrderDetailsStore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderDetailsPage = () => {
    const { idOrder } = useParams();    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = useState('panel-header-0');

    const { 
        orderProducts,
        order,
        orderName,
        orderDescription,
        updateDescription,
        addNewOrderProduct,
        contactName,
        orderStatusName,
        orderPriorityName,
        contactFullAddress,
        contactOptions,
        orderPriorityOptions,
        orderStatusOptions,
        productsOptions,
        printingServicesOptions,
        updateContact,
        updateStatus,
        updatePriority,
        updateOrderProduct,
        updateOrderProductProduct,
        updateOrderProductService,
        addNewOrderProductSpec,
        updateOrderProductSpec,
        DeleteOrderProductSpec,
        DeleteOrderProduct
    } = OrderDetailsStates(idOrder); 

    const Header = ({clientName, orderName}) => {
        return (
            <Box>
                <Typography variant="h6" color="secondary" gutterBottom>
                    {"Order #" + idOrder + clientName}
                </Typography>

                <Typography variant="h3" color={colors.grey[100]} gutterBottom>
                    <span style={{ fontWeight: 'bold' }}> {orderName} </span> 
                </Typography>
            </Box>
        )
    }

    const DetailsAccordion = ({ accordionTitle, items = [] }) => {
        return (
            <Accordion defaultExpanded>
                <AccordionSummary
                    id="details-accordion-header"
                    aria-controls="details-accordion-content"
                    expandIcon={<ExpandMoreIcon />}
                    sx={{backgroundColor:colors.primary[400], borderRadius:"6px"}}
                >
                    <Typography variant="h5"> 
                        <span style={{ fontWeight: 'bold' }}> { accordionTitle } </span> 
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{borderRadius:"6px"}}>
                    <Box margin={2}>
                        <Grid 
                            container
                            spacing={2}
                        >
                            {items.map((item) => (
                                <>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" justifyContent="center" alignContent="center">
                                            <span> {item.Title} </span>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        {
                                            item.Editable ? (
                                                <Autocomplete
                                                    value={ item.Content }
                                                    options={ item.Options || []}
                                                    onChange={(event, newValue) => {
                                                        if (item.MutateMethod) { 
                                                            item.MutateMethod(newValue.id); 
                                                        };
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            //inputRef={input => input && input.focus()} 
                                                            variant="standard"
                                                        />
                                                    )}
                                                />
                                            )
                                            : (
                                                <Typography variant="h6" justifyContent="center">
                                                    <span> { item.Content } </span>
                                                </Typography>
                                            )
                                        }
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
        )
    }

    const DisplayProducts = ({ orderProductsList = [] }) => {
        const handleChange = (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

        if (!Array.isArray(orderProductsList)) {
            console.error("Expected orderProductsList to be an array, but got:", orderProductsList);
            return null;
        }

        return (
            orderProductsList.map((product, index) => (
                <Accordion expanded={expanded === 'panel-header-'+index} onChange={handleChange('panel-header-'+index)}>
                    <AccordionSummary
                        sx={{backgroundColor:colors.primary[400], borderRadius:"6px"}}
                        expandIcon={<ExpandMoreIcon />}
                        id={"panel-header-" + index}
                        aria-controls={"panel-content-" + index}
                    >
                        <IconButton
                            size="small" 
                            aria-label="add" 
                            color={colors.grey[100]} 
                            style={{ marginTop: '-4px' }}
                            onClick={ () => { DeleteOrderProduct(product) }}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>

                        <Typography variant="h5"> 
                            <span style={{ fontWeight: 'bold' }}> # { product.getOrderProduct().getIdOrderProduct() } </span> 
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{borderRadius:"6px"}}>
                        <Grid container spacing={2}>
                            {/* ORDER PRODUCT DESCRIPTION */}
                            <Grid item xs={12}>
                                <TextField
                                    id="order-product-description"
                                    label="Description"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    maxRows={5}
                                    defaultValue={ product.getOrderProduct().getDescription() }
                                    onBlur={(newValue) => {
                                        if (product.getOrderProduct().getDescription() !== newValue.target.value) {
                                            product.getOrderProduct().setDescription(newValue.target.value);
                                            updateOrderProduct(product.getOrderProduct());
                                        }
                                    }}
                                />
                            </Grid>

                            {/* PRINTING SERVICES & PRODUCTS */}
                            <Grid item xs={10}>
                                {/* PRINTING SERVICES */}
                                <Autocomplete
                                    defaultValue={ 
                                        product.getOrderProduct().getPrintingService() ?
                                        product.getOrderProduct().getPrintingService().getName() : null
                                    }
                                    options={ printingServicesOptions || []}
                                    onChange={(event, newValue) => {
                                        updateOrderProductService(newValue.id, product.getOrderProduct());
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            //inputRef={input => input && input.focus()}
                                            label="Printing Service"
                                            variant="standard"
                                        />
                                    )}
                                />

                                {/* PRODUCTS */}
                                <Autocomplete
                                    defaultValue={ 
                                        product.getOrderProduct().getProduct() ? 
                                        product.getOrderProduct().getProduct().getProductType() + " - " + 
                                        product.getOrderProduct().getProduct().getBrand() + " - " + 
                                        product.getOrderProduct().getProduct().getName() 
                                        : null
                                    }
                                    options={ productsOptions || []}
                                    onChange={(event, newValue) => {
                                        updateOrderProductProduct(newValue.id, product.getOrderProduct());
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            //inputRef={input => input && input.focus()}
                                            label="Product"
                                            variant="standard"
                                        />
                                    )}
                                />
                            </Grid>

                            {/* PRODUCT IMAGE */}
                            <Grid item xs={2}>
                                <img src={`../../assets/user.png`} alt="Product" style={{ width: '100%', height: 'auto' }} />
                            </Grid>

                            {/* QUANTITIES, COLOR & SIZES*/}
                            <Grid item xs={12}>
                                <DisplaySpecs
                                    orderProduct={ product.getOrderProduct() }
                                    orderProductSpecs={ product.getOrderProductSpecs() }
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))
        )
    }

    const DisplaySpecs = ({ orderProduct = {}, orderProductSpecs = [] }) => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5" color={colors.grey[100]}> 
                            <span style={{ fontWeight: 'bold' }}> Product Specs </span> 
                        </Typography>
                        <IconButton 
                            size="small" 
                            aria-label="add-product" 
                            color={colors.grey[100]}
                            onClick={ () => addNewOrderProductSpec(orderProduct) }
                        >
                            <AddCircleOutlineIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    {orderProductSpecs.map((spec) => (
                        <Grid container spacing={2}>
                            { /* QUANTITIES */ }
                                <Grid item xs={3.5} pb={2}>
                                    <TextField
                                        id="spec-quantity"
                                        label="Quantity"
                                        variant="outlined"
                                        fullWidth
                                        gutterBottom
                                        defaultValue={ spec.getQuantity() }
                                        onBlur={(newValue) => {
                                            spec.setQuantity(newValue.target.value);
                                            updateOrderProductSpec(spec);
                                        }}
                                    />
                                </Grid>
                            { /* SIZE */ }
                                <Grid item xs={4} pb={2}>
                                    <TextField
                                        id="spec-size"
                                        label="Size"
                                        variant="outlined"
                                        fullWidth
                                        gutterBottom
                                        defaultValue={ spec.getSize() }
                                        onBlur={(newValue) => {
                                            spec.setSize(newValue.target.value);
                                            updateOrderProductSpec(spec);
                                        }}
                                    />
                                </Grid>
                            { /* COLOR */ }
                                <Grid item xs={4} pb={2}>
                                    <TextField
                                        id="spec-color"
                                        label="Color"
                                        variant="outlined"
                                        fullWidth
                                        gutterBottom
                                        defaultValue={ spec.getColor() }
                                        onBlur={(newValue) => {
                                            spec.setColor(newValue.target.value);
                                            updateOrderProductSpec(spec);
                                        }}
                                    />
                                </Grid>
                            { /* DELETE BUTTON */ }
                                <Grid item xs={0.5} pb={2} container justifyContent="center" alignItems="center">
                                    <IconButton 
                                        size="medium" 
                                        aria-label="add-product-spec" 
                                        color={colors.grey[100]}
                                        onClick={ () => DeleteOrderProductSpec(spec) }
                                    >
                                        <DeleteIcon fontSize="medium"/>
                                    </IconButton>
                                </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        )
    }

    return (
        <Box m={2}>
            <Grid container spacing={2}>
                { /* PAGE HEADER */ }
                <Grid item xs={12}>
                    <Header
                        clientName={ " / " + contactName }
                        orderName={ orderName }
                    />
                </Grid>

                {/* LEFT SIDE */}
                <Grid item xs={8}>
                    <Grid container rowSpacing={2}>
                        {/* ORDER DESCRIPTION */}
                        <Grid item xs={12}>
                            <TextField
                                id="order-description"
                                variant="filled"
                                fullWidth
                                multiline
                                maxRows={10}
                                defaultValue={ orderDescription }
                                onBlur={ (newValue) => { 
                                    if (orderDescription !== newValue.target.value) {
                                        updateDescription(newValue.target.value);
                                    }
                                }}
                            />
                        </Grid>

                        { /* PRODUCT LIST HEADER */ }
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h5" color={colors.grey[100]}> 
                                    <span style={{ fontWeight: 'bold' }}>List of Products</span> 
                                </Typography>
                                <IconButton 
                                    size="small" 
                                    aria-label="add-product" 
                                    color={colors.grey[100]}
                                    onClick={ () => { addNewOrderProduct(order) }}
                                >
                                    <AddCircleOutlineIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                        </Grid>

                        { /* PRODUCT LIST */ }
                        <Grid item xs={12}>
                            <DisplayProducts
                                orderProductsList={ orderProducts }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* RIGHT SIDE */}
                <Grid item xs={4}>
                    <Grid 
                        container
                        spacing={2}
                    >
                        {/* ORDER DETAILS */}
                        <Grid item xs={12}>
                            <DetailsAccordion
                                accordionTitle="Order Details"
                                items={[
                                    { 
                                        Title: "Status", 
                                        Content: orderStatusName, 
                                        Editable: true, 
                                        Options: orderStatusOptions,
                                        MutateMethod: updateStatus
                                    },
                                    { 
                                        Title: "Client", 
                                        Content: contactName, 
                                        Editable: true,
                                        Options: contactOptions,
                                        MutateMethod: updateContact
                                    },
                                    { 
                                        Title: "Priority", 
                                        Content: orderPriorityName, 
                                        Editable: true,
                                        Options: orderPriorityOptions,
                                        MutateMethod: updatePriority
                                    }
                                ]}
                            />
                        </Grid>

                        {/* CLIENT DETAILS */}
                        <Grid item xs={12}>
                            <DetailsAccordion
                                accordionTitle="Order Details"
                                items={[
                                    { 
                                        Title: "Client", 
                                        Content: contactName, 
                                        Editable: true,
                                        Options: contactOptions,
                                        MutateMethod: updateContact
                                    },
                                    { 
                                        Title: "Address", 
                                        Content: contactFullAddress, 
                                        Editable: false 
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Grid>                
            </Grid>
        </Box>
    )
}

export default OrderDetailsPage;