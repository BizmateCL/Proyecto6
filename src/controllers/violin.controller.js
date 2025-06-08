const Violin = require("../models/violin.model");

//funcion crear violin
exports.createViolin = async (req, res) => {
  const { name, price } = req.body; 
  try {
    const newViolin = await Violin.create({ name, price }); 
    return res.status(200).json({ newViolin }); //devuelve el estado 200 y los violines
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al crear el violín",
      error: error.message, //dato tecnico con info del error
    }); //status 500 error del server
  }
};
//actualizar violin por ID

exports.updateViolinById = async (req, res) => {
  const { name, price } = req.body; 
   try {
    const updateViolin = await Violin.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );
    if (!updateViolin) {
      return res.status(404).json({message: "Violin no encontrado",
      }); 
    }
    return res.status(200).json({ updateViolin }); 
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error actualizando el violin",
      error: error.message,
    });
  }
};
//eliminar violin por ID
exports.deleteViolinById = async (req, res) => {
  try {
    const deletedViolin = await Violin.findByIdAndDelete(req.params.id); //busca todos los violines
    if (!deletedViolin) {
      return res.status(404).json({ message: "Violin no encontrado" });
    }
    return res.status(200).json({ deletedViolin }); //devuelve el estado 200 y los violines
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al eliminar el violin",
      error: error.message, 
    }); 
  }
}
//obtener todos los violines

exports.getAllViolins = async (req, res) => {
  try {
    const violins = await Violin.find({}); //busca todos los violines
    return res.status(200).json({ violins }); //devuelve el estado 200 y los violines
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los violines",
      error: error.message, 
    }); 
  }
};

//Funcion de buscar violin por ID

// Buscar violin por ID
exports.getViolinById = async (req, res) => {
  try {
    const violin = await Violin.findById(req.params.id);
    if (!violin) {
      return res.status(404).json({ message: "Violin no encontrado" });
    }
    return res.status(200).json({ violin });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el violin",
      error: error.message,
    });
  }
};