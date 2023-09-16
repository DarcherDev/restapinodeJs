const { Router } = require('express');
const router = Router(); 

// Importa node-fetch de forma dinámica
import('node-fetch').then(async (nodeFetch) => {
    const fetch = nodeFetch.default;

    router.get('/', async (req, res) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        res.json(users); // Enviar los usuarios en lugar de la cadena 'users'
    });
});

module.exports = router;
