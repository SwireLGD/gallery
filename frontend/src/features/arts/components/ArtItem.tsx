import styled from "@emotion/styled";
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../users/usersSlice";
import { selectDeleting } from "../artsSlice";
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import { apiURL } from "../../../constants";
import { deleteArt } from "../artsThunks";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    _id: string;
    title: string;
    author: string;
    image: string | null;
    userId: string | { _id: string };
}

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '75%', 
});

const ArtItem: React.FC<Props> = ({ _id, title, image, userId, author }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleting = useAppSelector(selectDeleting);
    const [open, setOpen] = useState(false);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
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

    const userIdString = typeof userId === 'object' ? userId._id : userId;

    const canDelete = user?.role === 'admin' || (user?._id === userIdString);
    
    return (
        <>
            <Card sx={{ width: 300 }}> 
                <ImageCardMedia
                    image={cardImage}
                    title={title}
                    onClick={handleClickOpen}
                    style={{ cursor: 'pointer' }}
                />
                <CardContent>
                    <Typography variant="h6" component="div" onClick={handleClickOpen} sx={{cursor: "pointer"}}>
                        {title}
                    </Typography>
                    <Link to={`/arts/author/${userId}`} style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            color="textSecondary"
                            style={{ cursor: 'pointer' }}
                        >
                            By: {author}
                        </Typography>
                    </Link>
                </CardContent>
                <Box>
                    {canDelete && (
                        <Button size="small" onClick={handleDelete} disabled={deleting}>
                            {deleting ? <CircularProgress size={24} /> : "Delete"}
                        </Button>
                    )}
                </Box>
            </Card>
    
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <img src={cardImage} alt={title} style={{ maxWidth: '800px', maxHeight: '80vh' }} /> 
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