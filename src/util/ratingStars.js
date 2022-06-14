import {Star, StarHalf} from "@mui/icons-material";

export const getRatingStars = (rating) => {
    let starList = [];
    for (let i = 1; i <= rating; i++) {
        starList.push(<Star />)
    }
    if (rating - Math.floor(rating) > 0.5) starList.push(<StarHalf />)
    return starList;
}
