import {Users} from "../models/user.js";
import {Role} from "../models/role.js";
import {UserRole} from "../models/userroles.js"

export const getUserRoles = async (req, res) => {
    try {
       
        const { userid } = req.params; 
        console.log('Estas llamando a obtener los roles de un usuario : ' + userid);
        const user = await Users.findOne({
            where: { id: userid },
            include: [{
                model: Role,
                through: {
                    attributes: [] 
                }
            }]
        })
        if (user) {
            const roles = user.roles.map(role => role.nombre); // Obtener los nombres de los roles
            const rolesid = user.roles.map(role => role.id); // Obtener los id de los roles
            res.json({
                rolesid: rolesid
            });
        } else {
            res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const addRoleUser = async (req, res) => {
    try {
        console.log('Estas llamando a crear UserRole')
        const {userId , roleId } = req.body
        const newUserRole = await UserRole.create({
            userId,
            roleId 
        })
        res.json(newUserRole)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    console.log('Estás llamando a users');
    try {
        const user = await Users.findAll();
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Obtener un peso por su ID
export const getUsersId = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a users con el ID ${id}`);
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `No se encontró el peso con el ID ${id}`
            });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const createRole = async (req, res) => {
    try {
        console.log('Estas llamando a crear usuario')
        const {nombre } = req.body
        const newrole = await Role.create({
            nombre
           
        })
        res.json(newrole)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// Crear un nuevo peso
export const createUser = async (req, res) => {
    try {
        console.log('Estas llamando a crear usuario')
        const {usuario, correo, clave } = req.body
        const newuser = await Users.create({
            usuario,
            correo,
            clave,
           
        })
        res.json(newuser)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Actualizar un peso existente
export const updateUser = async (req, res) => {
    try {
        console.log('Estás llamando a Userupdate');
        const { id } = req.params;
        const {usuario, correo, clave , role} = req.body
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Luchador no encontrado' });
        }
        await user.update({
            usuario: usuario,
            correo: correo,
            clave: clave,
            role: role
        });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un peso por su ID
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(`Estás llamando a userdelete con el ID ${id}`);
    try {
        const user = await Users.findByPk(id);
        const usereliminada = user
        await user.destroy();
        res.json({usereliminada });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
