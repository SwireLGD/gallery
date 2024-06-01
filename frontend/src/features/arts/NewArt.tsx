import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect, useState } from "react";
import { ArtMutation } from "../../types";
import { createArt } from "./artsThunks";
import { Alert, Snackbar, Typography } from "@mui/material";
import ArtForm from "./components/ArtForm";

const NewArt = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (artMutation: ArtMutation) => {
        try {
            await dispatch(createArt(artMutation)).unwrap();
            setSnackbarMessage('Art created successfully!');
            setSnackbarOpen(true);
        } catch (e) {
            console.error(e);
            setSnackbarMessage('Failed to create the art.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Typography variant="h4">New art</Typography>
            <ArtForm onSubmit={onFormSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Art created successfully!' ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewArt;