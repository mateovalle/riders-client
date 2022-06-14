import {gql} from "@apollo/client";

export const RATE_RIDER = gql`
    mutation RateRider($rideId: String!, $stars: Int!){
        rateRider(input: {
            stars: $stars,
            rideId: $rideId,
        })
    }
`;
