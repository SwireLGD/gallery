import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectArts, selectFetchLoading } from "./artsSlice";
import { fetchArts } from "./artsThunks";
import { CircularProgress, Grid } from "@mui/material";
import ArtItem from "./components/artItem";

const Arts = () => {
    const dispatch = useAppDispatch();
    const arts = useAppSelector(selectArts);
    const isLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        dispatch(fetchArts());
    }, [dispatch]);

    return (
        <Grid container direction="column" gap={2}>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container gap={2}>
                    {arts.length > 0 ? (
                        arts.map(art => (
                            <ArtItem
                                key={art._id}
                                _id={art._id}
                                title={art.title}
                                art={art.art}
                                userId={art.userId}
                            />
                        ))
                    ) : (
                        <Grid item>
                            <p>No arts available.</p>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default Arts;