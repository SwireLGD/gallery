import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {useRef} from "react";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState('');

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }

        onChange(e);
    };

    return (
        <>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        disabled
                        label={label}
                        value={fileName}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={activateInput}
                    >Browse</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;