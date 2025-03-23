const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

let participants =;

const registrationValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
    body('event').trim().notEmpty().withMessage('Event selection is required'),
    body('
