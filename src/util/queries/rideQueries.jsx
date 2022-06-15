import {gql} from "@apollo/client";

export const RATE_RIDER = gql`
    mutation RateRider($rideId: String!, $stars: Int!){
        rateRider(input: {
            stars: $stars,
            rideId: $rideId,
        })
    }
`;

export const GET_CALLER_ACTIVE_RIDES = gql`
    query GetCallerActiveRides{
        getCallerActiveRides{
            id
            call {
                requestedVehicles{
                    bicycle
                    motorcycle
                    car
                    van
                }
                priceInCents
                description
                startLocation{
                    address
                    lat
                    long
                }
                finishLocation{
                    address
                    lat
                    long
                }
            }
            vehicleUsed,
            riderArrivedStartLocation,
        }
    }
`;
