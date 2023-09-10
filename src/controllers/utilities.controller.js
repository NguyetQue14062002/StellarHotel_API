import {utilitiesRepository} from '../repositories/index.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { STATUS, MAX_RECORDS } from '../global/constants.js';
import {v2 as cloudinary} from 'cloudinary';

const getAllUtilities = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    let { page = 1, size = MAX_RECORDS,searchString } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;
    try {
        const existingUtilities = await utilitiesRepository.getAllUtilities(page, size,searchString);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            data: existingUtilities,
        });
    } catch (error) {
        next(error);
    }
};
const createUtility = async (req, res) => {
    const link_img = req.file?.path;
    const { name, description } = req.body;
    try {
        const newUtility = await utilitiesRepository.createUtility(name, link_img, description);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Create utility successfully.',
            data: newUtility,
        });
    } catch (exception) {
             await cloudinary.uploader.destroy(
                req.file.filename,
                { invalidate: true, resource_type: "image" }
            );
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                error: STATUS.ERROR,
                message: `${exception.message}`,
            });
    }
};

const updateUtility = async (req, res) => {
    const link_img = req.file ?.path;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { id, name,  description } = req.body;
    try {
        const updatedUtility = await utilitiesRepository.updateUtility(id, name, link_img, description);
        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update utility successfully.',
            data: updatedUtility,
        });
    } catch (exception) {
        await cloudinary.uploader.destroy(
            req.file.filename,
            { invalidate: true, resource_type: "image" }
        );
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