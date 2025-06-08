const express=require('express');
const auth=require('../middleware/authorization');
const {createUser,login,verifyUser }=require('../controllers/user.controller');

const userRouter = express.Router();    


userRouter.post('/create', createUser);//localhost:3000/api/users/create
userRouter.post('/login', login);//localhost:3000/api/users/login
userRouter.get('/verify-user',  auth, verifyUser);//localhost:3000/api/users/verify-user

//Crear un endpoint para actualizar un usuario 
userRouter.put("/users/:id", auth, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let updateFields = { username, email };

    // Si se envía un nuevo password, hashearlo
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateFields.password = await bcryptjs.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json({ updateUser });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error actualizando el usuario",
      error: error.message,
    });
  }
});

module.exports = userRouter;






