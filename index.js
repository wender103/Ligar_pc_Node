const express = require('express');
const net = require('net');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem (não seguro para produção)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/wol', (req, res) => {
  sendWoL();
  res.send('Comando WoL enviado com sucesso!');
});

function sendWoL() {
  const macAddress = '80-EE-73-0D-AA-09'; // Substitua pelo endereço MAC do dispositivo de destino
  const buffer = Buffer.alloc(17 * 6);

  for (let i = 0; i < 17; i++) {
    buffer.write(macAddress.replace(/:/g, ''), i * 6, 6, 'hex');
  }

  const client = net.createConnection({
    port: 7,
    localAddress: '192.168.1.255', // Usando o endereço IP de broadcast da sua rede
  }, () => {
    console.log('Pacote WoL enviado.');
    client.end();
  });

  client.on('error', (error) => {
    console.error('Erro ao enviar o pacote WoL:', error);
  });

  client.write(buffer);
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});