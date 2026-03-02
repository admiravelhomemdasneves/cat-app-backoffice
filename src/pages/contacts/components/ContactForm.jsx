import React from "react";
import { Grid, TextField, Typography, Box } from "@mui/material";

const ContactForm = ({ initialData = {}, onChange }) => {
    const [form, setForm] = React.useState(() => {
        const defaults = {
            idContact: null,
            firstName: "",
            lastName: "",
            nif: "",
            phoneNumber: "",
            email: "",
            shippingAddress: {
                id_address: null, street: "", door_number: "", zip_code: "", city: "", country: "", addressType: "Shipping", flagActive: true,
            },
            billingAddress: {
                id_address: null, street: "", door_number: "", zip_code: "", city: "", country: "", addressType: "Billing", flagActive: true,
            },
        };

        return {
            ...defaults,
            ...initialData,
            shippingAddress: initialData?.shippingAddress ?? defaults.shippingAddress,
            billingAddress: initialData?.billingAddress ?? defaults.billingAddress,
        };
    });

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange?.(updated);
  };

  const handleAddressChange = (type, field, value) => {
    const updated = {
      ...form,
      [type]: {
        ...form[type],
        [field]: value,
      },
    };

    setForm(updated);
    onChange?.(updated);
  };

  return (
    <Box>
      <Grid container spacing={3}>

        {/* First + Last Name */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="firstName"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="lastName"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Grid>

        {/* Other Contact Fields */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="nif"
            value={form.nif}
            onChange={(e) => handleChange("nif", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Grid>

        {/* SHIPPING ADDRESS */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Shipping Address
          </Typography>
        </Grid>

        {/* Street + Door */}
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="street"
            value={form.shippingAddress.street}
            onChange={(e) =>
              handleAddressChange("shippingAddress", "street", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="door_number"
            value={form.shippingAddress.door_number}
            onChange={(e) =>
              handleAddressChange("shippingAddress", "door_number", e.target.value)
            }
          />
        </Grid>

        {/* Zip + City + Country */}
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="zip_code"
            value={form.shippingAddress.zip_code}
            onChange={(e) =>
              handleAddressChange("shippingAddress", "zip_code", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="city"
            value={form.shippingAddress.city}
            onChange={(e) =>
              handleAddressChange("shippingAddress", "city", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="country"
            value={form.shippingAddress.country}
            onChange={(e) =>
              handleAddressChange("shippingAddress", "country", e.target.value)
            }
          />
        </Grid>

        {/* BILLING ADDRESS */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Billing Address
          </Typography>
        </Grid>

        {/* Street + Door */}
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="street"
            value={form.billingAddress.street}
            onChange={(e) =>
              handleAddressChange("billingAddress", "street", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="door_number"
            value={form.billingAddress.door_number}
            onChange={(e) =>
              handleAddressChange("billingAddress", "door_number", e.target.value)
            }
          />
        </Grid>

        {/* Zip + City + Country */}
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="zip_code"
            value={form.billingAddress.zip_code}
            onChange={(e) =>
              handleAddressChange("billingAddress", "zip_code", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="city"
            value={form.billingAddress.city}
            onChange={(e) =>
              handleAddressChange("billingAddress", "city", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="country"
            value={form.billingAddress.country}
            onChange={(e) =>
              handleAddressChange("billingAddress", "country", e.target.value)
            }
          />
        </Grid>

      </Grid>
    </Box>
  );
};

export default ContactForm;