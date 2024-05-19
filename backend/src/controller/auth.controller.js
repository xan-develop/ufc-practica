import { Users } from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Role} from "../models/role.js";


export const login = async (req, res) => {
    const { usuario, clave } = req.body;
  
    try {
      const username = await Users.findOne({ where: { usuario } });
      const rol = await Users.findOne({
        where: { usuario },
        include: [{
            model: Role,
            through: {
                attributes: [] 
            }
        }]
    })
    const rolesid = rol.roles.map(role => role.id); // Obtener los id de los roles
      if (!username) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      try {
        const validClave = await bcrypt.compare(clave, username.clave);
        if (!validClave) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        return res.status(500).json({ message: 'Error al comparar contraseñas' });
      }
      // Genera token de autenticación
      const token = jwt.sign({ usernameId: username.id }, 'secreto', { expiresIn: '1h' });
      // Responder con el token 
      res.status(200).json({ token, username: { usuario: username.usuario} , rolesid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error de servidor' });
    }
  };

