import {gql} from "@apollo/client";

export const CREATE_CALL = gql`
  mutation CreateCall($bicycle: Boolean!, $motorcycle: Boolean!, $car: Boolean!, $van: Boolean!, $priceInCents: Int!, $description: String!, $startAddress: String!, $finishAddress: String!, $startLat: Float!, $startLong: Float!, $finishLat: Float!, $finishLong: Float!) {
    createCall(input: {
            bicycle: $bicycle,
            motorcycle: $motorcycle,
            car: $car,
            van: $van,
            priceInCents: $priceInCents,
            description: $description,
            startAddress: $startAddress,
            finishAddress: $finishAddress,
            startLat: $startLat,
            startLong: $startLong,
            finishLat: $finishLat,
            finishLong: $finishLong
    }) {
        id    
    }
  }
`;


export const GET_ONGOING_CALLS = gql`
  query GetActiveCalls{
      getActiveCalls{
          id
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
  }
`;

export const GET_CALLER_RECORD = gql`
    query GetCallerRecord{
        getCallerRecord{
            id,
            call{
                id,
                callerRatingStars,
                requestedVehicles{
                    bicycle,
                    motorcycle,
                    car,
                    van,
                },
                priceInCents,
                description,
                startLocation{
                    address,
                    lat,
                    long
                },
                finishLocation {
                    address,
                    lat,
                    long
                }
            },
            riderArrivedStartLocation,
            date,
            vehicleUsed,
            finishDate,
            riderRatingStars,
        }
    }
`;

export const CANCEL_CALL = gql`
    mutation CancelCall($callId: String!){
        cancelCall(input: {
            callId: $callId,
        })
    }
`;
