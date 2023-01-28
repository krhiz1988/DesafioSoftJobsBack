const pool = require('../dataBase/conexion');
const bcrypt = require('bcryptjs');

const mostrarUsuarios = async(email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontraron usuarios" }
}

const crearUsuario = async(email, password, rol, lenguage) => {
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
    const passwordCrypt = bcrypt.hashSync(password);
    const values = [email, passwordCrypt, rol, lenguage];
    await pool.query(consulta, values);
}

const verificarUsuario = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}

module.exports = {mostrarUsuarios, crearUsuario, verificarUsuario}