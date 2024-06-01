import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { selectFetchLoading } from "../artsSlice";
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import { apiURL } from "../../../constants";
import { deleteArt } from "../artsThunks";
import { useState } from "react";

interface Props {
    _id: string;
    title: string;
    art: string | null;
    userId: string;
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%' 
});

const ArtItem: React.FC<Props> = ({ _id, title, art, userId }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectFetchLoading);
    const [open, setOpen] = useState(false);

    let cardImage = imageNotAvailable;

    if (art) {
        cardImage = apiURL + '/public/' + art;
    }

    const handleDelete = () => {
        dispatch(deleteArt(_id));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const canDelete = user?.role === 'admin' || (user?._id === userId);

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <ImageCardMedia
                    image={cardImage}
                    title={title}
                    onClick={handleClickOpen}
                    style={{ cursor: 'pointer' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions>
                    {canDelete && (
                        <Button size="small" onClick={handleDelete} disabled={isLoading}>
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <img src={cardImage} alt={title} style={{ width: '100%', height: 'auto' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ArtItem;