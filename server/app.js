const data = require('./data');
const http = require('http');

const hostname = 'localhost';
const port = 3035;

const getProductsHandler = (res, url) => {
    res.writeHead(200, { 'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*' });

    const queryParams = url.split('?')[1];
    const name = queryParams ? url.split('name=')[1] : '';

    if (name) {
        const matchingProducts = data.filter(({ name: productName }) =>
            productName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        );
        res.write(JSON.stringify(matchingProducts || []));
    } else {
        res.write(JSON.stringify(data));
    }

    res.end();
};

const invalidRouteHandler = (res) => {
    res.writeHead(400, {
        'Content-Type': 'text/plain',
    });
    res.write('Invalid route.');
    res.end();
};

/**
 * Normally this is a create a production ready service on this way is
 * not a good idea. Why? Because not using a NodeJS framework would force
 * you to spend great deal of time implementing utilities and solving common
 * problems that are already solved on those frameworks.
 *
 * For the sake of time I would play along with the provided snippets and native
 * HTTP sever.
 */
http.createServer(function (req, res) {
    // dealing with cors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const { url } = req;
    const route = url.split('?')[0];

    switch (route) {
        case '/products':
            getProductsHandler(res, url);
            break;
        default:
            invalidRouteHandler(res);
            break;
    }
}).listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
