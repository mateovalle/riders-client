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


