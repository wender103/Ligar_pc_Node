const express = require('express');
const wakeonlan = require('wake_on_lan');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.post('/ligar-pc', (req, res) => {
    //Meu pc 'AC-22-0B-2E-13-5C'
    //Not '80-EE-73-0D-AA-09'
    const macAddress = '80-EE-73-0D-AA-09'; // Substitua pelo endereço MAC do seu PC
    
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
