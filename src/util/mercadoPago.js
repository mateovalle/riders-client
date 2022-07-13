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
            failure: "http://localhost:3000/home",
            pending: "http://localhost:3000/home",
            success: "http://localhost:3000/home"
        },
        external_reference: callerId,
        auto_return: "approved",
    };

    const payment = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'api key'
        }
    });

    return payment.data;
}
