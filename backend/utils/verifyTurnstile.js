import axios from 'axios';

export const verifyTurnstile = async (token) => {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

    const response = await axios.post(url, `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data;
};