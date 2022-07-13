import {gql} from "@apollo/client";

export const REGISTER_CALLER = gql`
  mutation RegisterCaller($name: String!, $surname: String!, $DNI: Int!, $email: String!, $password: String!) {
    registerCaller(input: {
        name: $name,
        surname: $surname,
        DNI: $DNI,
        email: $email,
        password: $password,
        })
        {
            name
        }
  }
`;

export const LOGIN_CALLER = gql`
  mutation LoginCaller($email: String!, $password: String!) {
    logInCaller(input: {
        email: $email,
        password: $password,
        })
        {
            token
        }
  }
`;

export const GET_CALLER = gql`
    query GetCaller{
        getCaller{
            id
            name
            surname
            DNI
            email{
                address
            }
            rating{
                stars
            }
            balanceInCents
            emailNotifications
        }
    }
`;

export const EMAIL_NOTIFICATIONS = gql`
    mutation SetCallerEmailNotifications($emailNotifications: Boolean!) {
        setCallerEmailNotifications(input: {
            emailNotifications: $emailNotifications,
        })
    }
`;
