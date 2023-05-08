const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token_header = req.headers.auth;

  if (!token_header) return res.status(401).send({ error: 'Sem autenticação' });

  jwt.verify(token_header, '123', (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.user_id = decoded.id;
    next();
  });
};

module.exports = auth;
