const { Users } = require("../db");

//* GET obtener la lista de tareas
const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    const usersOrder = users.sort((a, b) => {
      //?Ordeno las tareas de mas nueva a mas vieja
      return a.createdAt - b.createdAt;
    });
    return res.status(200).json(usersOrder);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

//* POST crear una tarea
const postUsers = async (req, res) => {
  const {
    name,
    last_name,
    password,
    identification_card,
    email,
    role,
    gender,
    address,
    details,
    health_details,
    number,
  } = req.body;
  try {
    const user = await Users.create({
      name,
      last_name,
      password,
      identification_card,
      email,
      role,
      gender,
      address,
      details,
      health_details,
      number,
    });
    console.log(` El Usuario ${name} se creo exitosamente`);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

//* PUT actualizar un usuario
const putUser = async (req, res) => {
  const { user_id } = req.params;
  const {
    name,
    last_name,
    password,
    identification_card,
    email,
    role,
    gender,
    address,
    details,
    health_details,
    number,
  } = req.body;

  try {
    const user = await Users.update(
      {
        name: name,
        last_name: last_name,
        password: password,
        identification_card: identification_card,
        email: email,
        role: role,
        gender: gender,
        address: address,
        details: details,
        health_details: health_details,
        number: number
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );

      console.log('El usuario se actualizo correctamente')
      return res.status(200).json({
        message: 'El usuario se actualizo correctamente'
      })

  } catch (error){
    console.log('Error al actualizar el usuario: ', error)
    return res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message,
    })
  }
};

//* DELETE user by id
const deleteUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const deleteUser = await Users.destroy({
      where: {
        user_id: user_id,
      },
    });

    console.log(">>>> USUARIO ELIMINADO<<<", deleteUser);
    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar al usuario", error);
    return res.status(500).json({
      message: "Error al eliminar al usuario",
    });
  }
};

module.exports = {
  getUsers,
  postUsers,
  deleteUserId,
  putUser,
};
