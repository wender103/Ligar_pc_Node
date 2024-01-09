const express = require('express');
const dgram = require('dgram');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitindo qualquer origem (não seguro para produção)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/wol', (req, res) => {
  sendWoL();
  res.send('Comando WoL enviado com sucesso!');
});

function sendWoL() {
  const macAddress = 'AC-22-0B-2E-13-5C'; // Substitua pelo endereço MAC do dispositivo de destino
  const buffer = Buffer.alloc(17 * 6);

  for (let i = 0; i < 17; i++) {
    buffer.write(macAddress.replace(/:/g, ''), i * 6, 6, 'hex');
  }

  const client = dgram.createSocket('udp4');

  client.send(buffer, 0, buffer.length, 9, '192.168.1.255', (err) => {
    client.close();
    if (err) {
      console.error('Erro ao enviar o pacote WoL:', err);
    } else {
      console.log('Pacote WoL enviado.');
    }
  });
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
