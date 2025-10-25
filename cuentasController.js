const fs = require('fs');
const path = require('path');
const cuentasPath = path.join(__dirname, '..', 'data', 'cuentas.json');

// Función para leer las cuentas desde el archivo JSON
function leerCuentas() {
  const raw = fs.readFileSync(cuentasPath, 'utf8');
  return JSON.parse(raw);
}

// GET /cuentas
exports.listarCuentas = (req, res) => {
  const cuentas = leerCuentas();
  const q = req.query.queryParam;

  if (!q) {
    return res.json({ count: cuentas.length, data: cuentas });
  }

  // Si hay queryParam, buscar por id, name o gender
  const results = [];
  const qLower = q.toLowerCase();

  for (const c of cuentas) {
    if (String(c.id) === q) {
      results.push(c);
      continue;
    }
    if (String(c.name).toLowerCase().includes(qLower)) {
      results.push(c);
      continue;
    }
    if (String(c.gender).toLowerCase() === qLower) {
      results.push(c);
      continue;
    }
  }

  if (results.length === 0) {
    return res.json({ finded: false });
  } else if (results.length === 1) {
    return res.json({ finded: true, account: results[0] });
  } else {
    return res.json({ finded: true, data: results });
  }
};

// GET /cuenta/:id
exports.obtenerCuentaPorId = (req, res) => {
  const cuentas = leerCuentas();
  const id = req.params.id;
  const account = cuentas.find(c => String(c.id) === String(id));

  if (!account) {
    return res.json({ finded: false, account: null });
  }
  return res.json({ finded: true, account });
};

// GET /cuentasBalance
exports.obtenerBalanceTotal = (req, res) => {
  const cuentas = leerCuentas();
  const activos = cuentas.filter(c => c.isActive === true);

  if (activos.length === 0) {
    return res.json({ status: false, accountBalance: 0 });
  }

  const suma = activos.reduce((acc, cur) => acc + Number(cur.balance), 0);
  return res.json({ status: true, accountBalance: suma });
};
