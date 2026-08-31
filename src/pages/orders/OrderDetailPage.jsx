import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import OrderDetailsView from "./components/OrderDetailsView";
import { OrderDetailPageStore } from "./OrderDetailPageStore";

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const {
        isPending,
        order,
        orderUpdateHook,
        contactOptions,
        statusOptions,
        prioritiesOptions,
        detailRowIdField,
        detailColumnsDefinition,
        detailSampleRow,
        detailUpdateHook,
        detailDeleteHook,
    } = OrderDetailPageStore(Number(id), state?.order ?? null);

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header title={`Order #${id}`} subtitle="View and manage order details" />
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
            <OrderDetailsView
                order={order}
                columnsDefinition={detailColumnsDefinition}
                sampleRow={detailSampleRow}
                rowIdField={detailRowIdField}
                orderUpdateHook={orderUpdateHook}
                productUpdateHook={detailUpdateHook}
                productDeleteHook={detailDeleteHook}
                contactOptions={contactOptions ?? []}
                statusOptions={statusOptions ?? []}
                prioritiesOptions={prioritiesOptions ?? []}
                borderLeft={0}
            />
        </Box>
    );
};

export default OrderDetailPage;
