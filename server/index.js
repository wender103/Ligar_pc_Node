const express = require('express');
const wakeonlan = require('wake_on_lan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permitir solicitações de qualquer origem
app.use(express.static('public'));
app.use(express.json());

app.post('/ligar-pc', (req, res) => {
        //Meu pc 'AC-22-0B-2E-13-5C'
    //Not '80-EE-73-0D-AA-09'
    const macAddress = req.body.macAddress || '80:EE:73:0D:AA:09'; // Pega o endereço MAC do corpo da requisição ou usa um padrão
    
    // Envia o comando Wake-on-LAN
    wakeonlan.wake(macAddress, (err) => {
        if (err) {
            console.error('Erro ao enviar o comando Wake-on-LAN:', err);
            res.status(500).send('Erro ao ligar o PC');
        } else {
            console.log('Comando Wake-on-LAN enviado com sucesso!');
            res.send('Comando Wake-on-LAN enviado com sucesso!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
