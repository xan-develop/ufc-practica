import { Users } from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const login = async (req, res) => {
    const { usuario, clave } = req.body;
  
    try {
      const user = await Users.findOne({ where: { usuario } });
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      try {
        const validClave = await bcrypt.compare(clave, user.clave);
        if (!validClave) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        return res.status(500).json({ message: 'Error al comparar contraseñas' });
      }
      // Genera token de autenticación
      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
      // Responder con el token 
      res.status(200).json({ token, user: { usuario: user.usuario, correo: user.correo } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error de servidor' });
    }
  };

