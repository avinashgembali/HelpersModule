import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { Helper } from "../models/helper.model";

export const errorHandler = (
  err: any,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode;
  const message = err.message;
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const successHandler = (
    res : Response,
    data : any,
    message : String
) => {
    res.status(200).json({
        success : true,
        msg : message,
        data : data
    });
};

export const parseFormData = (req : Request, res : Response, next : NextFunction) => {
  try {
    if (req.body.languages) {
      req.body.languages = JSON.parse(req.body.languages);
    }
    if (req.body.kycDocument) {
      req.body.kycDocument = JSON.parse(req.body.kycDocument);
    }
    if (req.body.additionalDocument) {
      req.body.additionalDocument = JSON.parse(req.body.additionalDocument);
    }
  } catch (err) {
    return res.status(400).json({ message: 'Invalid JSON in form data' });
  }
  next();
};


export const validateHelper = [
  body("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be number")
    .custom(async (value) => {
      const exist = await Helper.findOne({ id: value });
      if (exist) {
        throw new Error("id already exists");
      }
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be string"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be string"),
  body("imageUrl").isString().withMessage("image url must be string"),
  body("employeeCode")
    .notEmpty()
    .withMessage("employeeCode is required")
    .isString()
    .withMessage("employeeCode must be string"),
  body("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isString()
    .withMessage("gender must be string"),
  body("languages")
    .isArray()
    .withMessage("languages should be array")
    .notEmpty()
    .withMessage("atleast one language should be selected"),
  body("mobileNo")
    .notEmpty()
    .withMessage("mobile number is required")
    .isString()
    .withMessage("mobile number must be string"),
  body("emailId")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("email id should satisfy the validation"),
  body("organization")
    .notEmpty()
    .withMessage("organization is required")
    .isString()
    .withMessage("organization must be string"),
  body("joinedOn")
    .notEmpty()
    .withMessage("joinedOn is required")
    .isString()
    .withMessage("joinedOn must be string"),
  body("vehicle")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("vehicle should be string"),
  body("vehicleNumber")
    .optional({ checkFalsy: true }) // skip check if empty
    .isString()
    .withMessage("vehicle Number must be string")
    .bail() // stop if not a string
    .if((value, { req }) => req.body.vehicle && req.body.vehicle.trim() !== "")
    .notEmpty()
    .withMessage("vehicle Number is required when vehicle is provided"),
  body("kycDocument")
    .exists()
    .withMessage("kyc doc is required")
    .isObject()
    .withMessage("kyc should be object"),
  body("kycDocument.category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
  body("kycDocument.fileName")
    .notEmpty()
    .withMessage("File name is required")
    .isString()
    .withMessage("File name must be a string"),
  body("additionalDocument")
    .optional()
    .isObject()
    .withMessage("additional doc should be object"),
  body("additionalDocument.category")
    .if(body("additionalDocument").exists())
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
  body("additionalDocument.fileName")
    .if(body("additionalDocument").exists())
    .notEmpty()
    .withMessage("File name is required")
    .isString()
    .withMessage("File name must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
