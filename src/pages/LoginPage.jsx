import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import Services from "../api/services";
import { useEffect, useState } from "react";

const LoginPage = () => { 
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            navigate("/");
        }
    }, [success]);

    const handleSubmit = async () => {
        try {
            const response = await apiClient.post(Services.POST_LOGIN, JSON.stringify({ username, password }));
            const accessToken = response?.data?.token;
            if (accessToken !== null) { 
                apiClient.setAuthToken(accessToken); 
                setSuccess(true);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            console.log("err: ", err);
        };
    }

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}
        >
            <Grid item xs={12}>
                <img
                  alt="brand-logo"
                  width="200px"
                  height="auto"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography
                    id="landing-page-textfield"
                    variant="h2"
                >
                    welcome to{' '}
                    <Box component="span" sx={{ color: 'sienna' }}>
                        catarina almeida
                    </Box>{' '}
                    backoffice
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="username-textfield"
                    variant="filled"
                    label="username"
                    style = {{width: 300}}
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="password-textfield"
                    variant="filled"
                    type="password"
                    label="password"
                    style = {{width: 300}}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </Grid>

            <Grid item xs={12}>
                {errMsg ? errMsg : ""}
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    );
}

export default LoginPage;