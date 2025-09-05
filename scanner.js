// scanner.js
// Script para consultar Shodan y mostrar resumen de IPs en Guatemala
// Carnet: 1990-21-10104
// Nombre: Nelson Guaran
// Curso: Seguridad Informática


require('dotenv').config();
const express = require('express');
const axios = require('axios');

const SHODAN_API_KEY = process.env.SHODAN_API_KEY;
const SHODAN_URL = 'https://api.shodan.io/shodan/search';
const QUERY = 'country:"GT" city:"Guatemala"'; // Puedes cambiar la ciudad si lo deseas


async function consultarShodan(comando) {
    try {
        const query = comando || QUERY;
        const response = await axios.get(SHODAN_URL, {
            params: {
                key: SHODAN_API_KEY,
                query
            }
        });
        const results = response.data.matches;
        let salida = `--- Resultados de Shodan para consulta: ${query} ---\n`;
        results.forEach((item, idx) => {
            salida += `${idx + 1}. IP: ${item.ip_str} | Puertos: ${item.port}\n`;
        });

        // Resumen
        const totalIPs = results.length;
        const puertoCount = {};
        results.forEach(item => {
            puertoCount[item.port] = (puertoCount[item.port] || 0) + 1;
        });

        salida += '\n--- Resumen ---\n';
        salida += `Total de direcciones IP identificadas: ${totalIPs}\n`;
        salida += 'Total de IPs por puerto abierto:\n';
        Object.entries(puertoCount).forEach(([puerto, cantidad]) => {
            salida += `Puerto ${puerto}: ${cantidad} IPs\n`;
        });

        salida += '\nCarnet: 1990-21-10104\n';
        salida += 'Nombre: Nelson Guaran\n';
        salida += 'Curso: Seguridad Informática\n';
        return salida;
    } catch (error) {
        return 'Error consultando Shodan: ' + (error.response ? JSON.stringify(error.response.data) : error.message);
    }
}


const app = express();

app.use(express.json());

app.get('/scan', async (req, res) => {
    const resultado = await consultarShodan();
    res.type('text/plain').send(resultado);
});

app.post('/scan', async (req, res) => {
    const { comando } = req.body;
    if (!comando || typeof comando !== 'string') {
        return res.status(400).send('Debe enviar el comando de búsqueda en el campo "comando".');
    }
    const resultado = await consultarShodan(comando);
    res.type('text/plain').send(resultado);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Express escuchando en puerto ${PORT}`));
