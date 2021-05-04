'use strict';

const express = require('express');
const router = express.Router();

const Food = require('../models/food');

const foodInstance = new Food(); 

router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);


function getFood(req, res) {
    let items = foodInstance.get();
    res.status(200).json(items);
}

function getOneFood(req, res) {
    let id = parseInt(req.params.id); 
    let oneItem = foodInstance.get(id);
    res.status(200).json(oneItem);
}

function createFood(req, res) {
    let obj = req.body;
    let newItem = foodInstance.create(obj);
    res.status(201).json(newItem);
}

function updateFood(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedFood = foodInstance.update(id, obj);
    res.status(200).json(updatedFood);
}

function deleteFood(req, res) {
    let id = parseInt(req.params.id);
    let deleted = foodInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;