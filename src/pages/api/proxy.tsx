import type { NextApiRequest, NextApiResponse } from 'next'

const fetch = require('isomorphic-unfetch')

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.query;
    const response = await fetch(url);
    const text = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type','text/calendar');
    res.status(200).send(text);
}
