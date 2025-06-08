const express=require('express');
const{ createViolin, getViolinById, updateViolinById, deleteViolinById, getAllViolins} = require('../controllers/violin.controller');
const violinRouter = express.Router();

violinRouter.get('/',getAllViolins);//localhost:3000/api/violins
violinRouter.get('/:id',getViolinById);//localhost:3000/api/violins/id
violinRouter.post('/create',createViolin);//localhost:3000/api/violins/create
violinRouter.put('/:id',updateViolinById);//localhost:3000/api/violins/id
violinRouter.delete('/:id',deleteViolinById);//localhost:3000/api/violins/id

module.exports = violinRouter;
