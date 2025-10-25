const express = require('express');
const cors = require('cors');
const cuentasRouter = require('./routes/cuentas');
const app = express();
const PORT = 3130;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API de Cuentas - Examen Practico II - PW' });
});

app.use('/', cuentasRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
