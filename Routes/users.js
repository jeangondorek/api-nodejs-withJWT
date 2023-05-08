const express = require('express');
const router = express.Router();
const Users = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const creatToken = (userId)=>{
    return jwt.sign({ id: userId}, '123', {expiresIn: '7d'} );
}

router.get('/', (req, res) => {
  Users.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ error: 'Erro na consulta de usuários' }));
});

router.post('/create', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

  Users.findOne({ email })
    .then(user => {
      if (user) return res.status(400).send({ error: 'Email já cadastrado' });

      Users.create(req.body)
        .then(user => {
          user.password = undefined;
          return res.status(201).send({ user, token: creatToken(user.id) });
        })
        .catch(err => res.status(500).send({ error: 'Não foi possível buscar' }));
    })
    .catch(err => res.status(500).send({ error: 'Não foi possível buscar' }));
});

router.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Dados insuficientes' });
  }

  Users.findOne({ email }).select('password')
    .then(user => {
      if (!user) return res.status(400).send({ error: 'Usuário não registrado' });

      bcrypt.compare(password, user.password)
        .then(pass_ok => {
          if (!pass_ok) return res.status(401).send({ error: 'Senha incorreta' });
          user.password = undefined;
          return res.send({ user, token: creatToken(user.id) });
        })
        .catch(err => res.status(500).send({ error: 'Não foi possível buscar' }));
    })
    .catch(err => res.status(500).send({ error: 'Não foi possível buscar' }));
});

module.exports = router;
