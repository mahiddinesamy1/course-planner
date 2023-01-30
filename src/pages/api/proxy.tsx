const fetch = require('isomorphic-unfetch')

export default async (req: any, res: any) => {
    const { url } = req.query;
    const response = await fetch(url);
    const text = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type','text/calendar');
    res.status(200).send(text);
}
