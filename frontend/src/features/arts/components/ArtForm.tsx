import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import { ArtMutation } from "../../../types";
import { selectCreateLoading } from "../artsSlice";

interface Props {
    onSubmit: (mutation: ArtMutation) => void;
}

const ArtForm: React.FC<Props> = ({ onSubmit }) => {
    const isCreating = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<ArtMutation>({
        title: '',
        image: null,
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.title.trim()) {
            alert("Title is required");
            return;
        }
        if (!state.image) {
            alert("image file is required");
            return;
        }
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => ({ ...prevState, [name]: files[0] }));
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        id="name" label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name="image"
                        label="image"
                    />
                </Grid>
                <Grid item xs>
                    {isCreating ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default ArtForm;