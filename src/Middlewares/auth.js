const jwt = require('jsonwebtoken');
const config = require('../Config/Config');

const auth = (req, res, next) => {
  const token_header = req.headers.auth;

  if (!token_header) return res.status(401).send({ error: 'Sem autenticação' });

  jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.user_id = decoded.id;
    next();
  });
};

module.exports = auth;
