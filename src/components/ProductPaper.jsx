import { Paper, Box, Typography, useTheme, Grid, Divider } from "@mui/material";
import { tokens } from "../theme";
import EditButtons from "./EditButtons";
import SaveButtons from "./SaveButtons";

const ProductPaper = ({ 
        id,
        isEditing,
        onSave,
        onDelete, 
        onEdit,
        onCancel,
        productInfo
    }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    console.log("productInfo", productInfo);

    const tipoPeca = productInfo.orderProduct && productInfo.orderProduct.product.name ? productInfo.orderProduct.product.name : "Tipo de Peça: N/A";
    const marcaModelo = productInfo.orderProduct && productInfo.orderProduct.product.brand ? productInfo.orderProduct.product.brand : "Marca e Modelo: N/A";
    const tipoImpressao = productInfo.orderProduct && productInfo.orderProduct.printingService.name ? productInfo.orderProduct.printingService.name : "Tipo de Impressão: N/A";
    const descricao = productInfo && productInfo.orderProduct && productInfo.orderProduct.description ? productInfo.orderProduct.description : "Sem descrição";

    const orderProductSpecs = productInfo && Array.isArray(productInfo.orderProductSpecs) ? productInfo.orderProductSpecs : [];

    const renderProductSpecs = () => {
        return orderProductSpecs.map((spec, index) => {
            if (spec.flagStatus !== "1") {
                return null; // Skip this entry if flagStatus is not 1
            }

            const quantidade = spec && spec.quantity ? spec.quantity : "0";
            const cor = spec && spec.color ? spec.color : "N/A";
            const tamanho = spec && spec.size ? spec.size : "N/A";

            return (
                <Typography key={index} color={colors.grey[100]} variant="body1" gutterBottom>
                    {quantidade}x {tamanho} - {cor}
                </Typography>
            );
        });
    };

    return (
        <Box flex="0.3">
            <Paper elevation={4} style={{ padding: '10px' }}>
                <Grid container>
                    {/* HEADER */}
                    <Grid item xs={9}>
                        <Typography color={colors.grey[100]} variant="h3"> #{id} </Typography>
                    </Grid>

                    {/* EDIT & SAVE BUTTONS */}
                    <Grid item xs={2} style={{ marginLeft:"12px" }}>
                        <Box display="flex" justifyContent="flex-end">
                            {
                                isEditing === id ? (
                                    <SaveButtons
                                        iconize={true}
                                        variant="outlined"
                                        miniStyle={true}
                                        onSave={onSave}
                                        onCancel={onCancel}
                                    />
                                ) : (
                                    <EditButtons
                                        color={colors.grey[100]}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                )
                            }
                        </Box>
                    </Grid>

                    {/* DIVIDER (Horizontal line) */}
                    <Grid item xs={12} pt={1} pb={2}>
                        <Divider/>
                    </Grid>

                    {/* PRODUCT INFO */}
                    <Grid item xs={8}>
                        <Typography color={colors.grey[100]} variant="h4" gutterBottom> {tipoImpressao} </Typography>
                        <Typography color={colors.grey[100]} variant="body1" gutterBottom> {tipoPeca} - {marcaModelo} </Typography>
                        {renderProductSpecs()}
                        <Typography color={colors.grey[100]} variant="body1" gutterBottom> Descrição: {descricao} </Typography>
                    </Grid>

                    {/* PRODUCT IMAGE */}
                    <Grid item xs={4}>
                        <img src={`../../assets/user.png`} alt="Product" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default ProductPaper;