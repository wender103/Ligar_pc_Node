const http = require('http');
const net = require('net');

const macAddress = '80:EE:73:0D:AA:09'; // Substitua pelo endereço MAC do dispositivo de destino

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/wol') {
    sendWoL();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Comando WoL enviado com sucesso!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Endpoint não encontrado.');
  }
});

function sendWoL() {
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

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
