const jwt = require("jsonwebtoken");
const { mostrarUsuarios, crearUsuario, verificarUsuario } = require("../services/indexServices");

const indexController = {
  mostrarUser: async (req, res) => {
    try {
      const Authorization = req.header("Authorization");
      const token = Authorization.split("Bearer ")[1];
      jwt.verify(token, "az_AZ");
      const { email } = jwt.decode(token);
      const usuario = await mostrarUsuarios(email);

      re.status(200).send(usuario);
    } catch (e) {
      res.status(e.code || 500).send(e);
    }
  },

  crearUser: async (req, res) => {
    try {
      const { email, password, rol, lenguage } = req.body;
      await crearUsuario(email, password, rol, lenguage);
      res.status(200).send("Se ha agregado con éxito, " + email);
    } catch (e) {
      res.status(e.code || 500).send(e);
    }
  },
  iniciarSesion: async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = jwt.sign({ email }, "az_AZ", { expiresIn: "300" });
      await verificarUsuario(email, password);
      res.send(token);
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
};

module.exports = indexController;
