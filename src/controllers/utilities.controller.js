import {utilitiesRepository} from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';

const getAllUtilities = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    let { page = 1, size = MAX_RECORDS, name = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;
    try {
        const existingUtilities = await utilitiesRepository.getAllUtilities(page, size, name);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            data: existingUtilities,
        });
    } catch (error) {
        next(error);
    }
};
const createUtility = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { name, image, description } = req.body;
    try {
        const newUtility = await utilitiesRepository.createUtility(name, image, description);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Create utility successfully.',
            data: newUtility,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
const updateUtility = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { id, name, image, description } = req.body;
    try {
        const updatedUtility = await utilitiesRepository.updateUtility(id, name, image, description);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update utility successfully.',
            data: updatedUtility,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};
const deleteUtility = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
        const deletedUtility = await utilitiesRepository.deleteUtility(id);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete utility successfully.',
            data: deletedUtility,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`,
        });
    }
};

export default { getAllUtilities, createUtility, updateUtility, deleteUtility};