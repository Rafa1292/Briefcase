const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

async function signUp(req, res) {
  const { name, lastname, email, password, repeatPassword } = req.body;
  const user = new User();
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (validatePassword(password, repeatPassword, res)) {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña" });
      } else {
        user.password = hash;
        saveUser(user, res);
      }
    });
  }
}

function validatePassword(password, repeatPassword, res) {
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
    return false;
  } else if (password !== repeatPassword) {
    res.status(404).send({ message: "Las contraseñas no son iguales" });
    return false;
  }

  return true;
}

function saveUser(user, res) {
  user.save((err, userStored) => {
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        res.status(500).send({ message: "Este usuario ya existe" });
      } else {
        res.status(500).send({ message: `Error al crear usuario ${err}` });
      }
    } else if (!userStored) {
      res.status(404).send({ message: `Error al crear usuario` });
    } else {
      res.status(200).send({ user: userStored });
    }
  });
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    console.log(userStored);
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
};
