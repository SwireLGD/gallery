import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtsByUserId } from "./artsThunks";
import { selectArts, selectFetchLoading } from "./artsSlice";
import { CircularProgress, Grid } from "@mui/material";
import ArtItem from "./components/ArtItem";

const ArtsByAuthor = () => {
    const { userId } = useParams<{ userId: string }>();
    const dispatch = useAppDispatch();
    const arts = useAppSelector(selectArts);
    const isLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        if (userId) {
            dispatch(fetchArtsByUserId(userId));
        }
    }, [dispatch, userId]);

    return (
        <Grid container direction="column" gap={2}>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container spacing={2}>
                    {arts.length > 0 ? (
                        arts.map((art) => (
                            <Grid item key={art._id} xs={12} sm={6} md={4} lg={3}>
                                <ArtItem
                                    _id={art._id}
                                    title={art.title}
                                    image={art.image}
                                    userId={art.userId}
                                    author={art.author}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <p>No arts available for this author.</p>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default ArtsByAuthor;