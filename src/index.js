require("dotenv").config();
const express = require("express"); //tiene que ver con las rutas de la api.
const cors = require("cors"); 
const connectDB = require("./config/db"); //conectar a la base de datos
const userRouter= require('./routes/user.routes');
const guitarRouter= require('./routes/guitar.routes');//importar las rutas de guitarra

const PORT = process.env.PORT || 5000; //puerto por defecto
const User = require("./models/user.model"); //importar el modelo de usuario
const Guitar = require("./models/guitar.model"); //importar el modelo de guitarra
//middleware
const app = express(); 
connectDB();
app.use(cors())

app.use(express.json()); 
app.use('/api/users',userRouter)//localhost:3000/api/users
//app.use('/api/guitars',guitarRouter)//localhost:3000/api/guitars
app.get("/guitars", async (req, res) => {
  //req y res peticion y respuesta
  try {
    const guitars = await Guitar.find({}); //busca todas las guitarras
    return res.status(200).json({ guitars }); //devuelve el estado 200 y las guitarras
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las guitarras",
      error: error.message, //datot tecnico con info del error
    }); //status 500 error del server
  }
});
//crear un endpoint para el usuario que permita obtener todos los usuarios de la base de datos
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); //busca todos los usuarios
    return res.status(200).json({ users }); //devuelve el estado 200 y los usuarios
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message, //dato tecnico con info del error
    }); //status 500 error del server
  }
});

/*
app.post("/users/create", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si ya existe un usuario con ese email o username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al crear usuario",
      error: error.message,
    });
  }
});
*/
/*
app.post("/users/iniciar-sesion", async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email }); //busca el usuario por email
    if (!foundUser) {
      return res.status(404).json({ message: "Usuario no encontrado" }); //status 404 error del server
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      foundUser.password
    ); //compara la contraseña que viene en el body con la que esta hasheada(encriptada), es decir la que viene de la bd.
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "usuario o Contraseña no corresponden" });
    }
   const payload = {
      user: {
        id: foundUser._id,
      },
    };
    //aqui se va a crear la firma : JWT, jason web token.
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: '60s', //Tiempo de expiracion del token, en milisegundos
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token }); //devuelve el token
      }
    );
  } catch (error) {
    res.json({
      message: "error al iniciar sesion",
      error,
    });
  }
});
*/
/*
app.get("/users/verificar-usuario", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user }); //devuelve todos los datos en un json
  } catch (error) {
    res.status(500).json({
      msg: "hubo un error al consultar el usuario",
      error,
    });
  }
});
*/
//crear una guitarra

app.post("/guitars", async (req, res) => {
  //req y res peticion y respuesta. Aqui si se usara el request
  const { name, price } = req.body; //desestructuracion de los datos que vienen del body
  try {
    const newGuitar = await Guitar.create({ name, price }); //busca todas las guitarras
    return res.status(200).json({ newGuitar }); //devuelve el estado 200 y las guitarras
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al crear la guitarra",
      error: error.message, //dato tecnico con info del error
    }); //status 500 error del server
  }
});

//actualizar una guitarra
app.put("/guitars/:id", async (req, res) => {
  //req y res peticion y respuesta. Aqui si se usara el request
  const { name, price } = req.body; //desestructuracion de los datos que vienen del body
  try {
    const updateGuitar = await Guitar.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );
    if (!updateGuitar) {
      return res.status(404).json({
        message: "Guitarra no encontrada",
      }); //status 404 error del server
    }
    return res.status(200).json({ updateGuitar }); //devuelve el estado 200 y las guitarras
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error actualizazndo la guitarra",
      error: error.message, //dato tecnico con info del error
    }); //status 500 error del server
  }
});
//eliminar una guitarra

app.delete("/guitars/:id", async (req, res) => {
  try {
    const deletedGuitar = await Guitar.findByIdAndDelete(req.params.id); //busca todas las guitarras
    if (!deletedGuitar) {
      return res.status(404).json({ message: "Guitarra no encontrada" });
    }

    return res.status(200).json({ deletedGuitar }); //devuelve el estado 200 y las guitarras
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al eliminar la guitarra",
      error: error.message, //dato tecnico con info del error
    }); //status 500 error del server
  }
});

//Crear un endpoint para actualuzar un documento y tambien agregar un nuero request
//en la coleccion de usuarios
/*
app.put("/users/:id", auth, async (req, res) => {
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
      message: "Hubo un error actualizazndo la usuario",
      error: error.message,
    });
  }
});
*/


app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto" + PORT); 
}); 
