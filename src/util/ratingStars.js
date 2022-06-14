import {Star, StarHalf} from "@mui/icons-material";

const renderStar = () => {
    return <Star />
}
const renderHalfStar = () => {
    return <StarHalf />
}
export const getRatingStars = (rating) => {
    let starList = [];
    for (let i = 1; i <= rating; i++) {
        starList.push(<Star />)
    }
    if (rating - Math.floor(rating) > 0.5) starList.push(<StarHalf />)
    return starList;
}
