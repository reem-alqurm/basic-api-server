'use strict';

const express = require('express');
const router = express.Router();

const Clothes = require('../models/clothes');

const clothesInstance = new Clothes(); 

router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);


function getClothes(req, res) {
    let items = clothesInstance.get();
    res.status(200).json(items);
}

function getOneClothes(req, res) {
    let id = parseInt(req.params.id); 
    let oneItem = clothesInstance.get(id);
    res.status(200).json(oneItem);
}

function createClothes(req, res) {
    let obj = req.body;
    let newItem = clothesInstance.create(obj);
    res.status(201).json(newItem);
}

function updateClothes(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedClothes = clothesInstance.update(id, obj);
    res.status(200).json(updatedClothes);
}

function deleteClothes(req, res) {
    let id = parseInt(req.params.id);
    let deleted = clothesInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;