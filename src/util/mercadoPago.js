const axios = require('axios').default;

export const createPayment = async (callerId, saldo) => {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
        items: [
            {
                title: "saldo",
                quantity: 1,
                unit_price: saldo
            }
        ],
        back_urls: {
            failure: "localhost:3000/home",
            pending: "localhost:3000/home",
            success: "localhost:3000/home"
        },
        external_reference: callerId,
        auto_return: "approved",
    };

    const payment = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer TEST-6309621162632226-071303-e64ef5b42a7349e43c3402b2fa3e72a6-327024543`
        }
    });

    return payment.data;
}
