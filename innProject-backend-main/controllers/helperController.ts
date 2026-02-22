// controllers/helperController.ts
import { Request, Response } from "express";
import { HelperService } from "../services/helperService";
import { NextFunction } from "express";
import { successHandler } from "../middlewares/errorHandler";
import { FileService } from "../services/fileService";

export class HelperController {
  private helperService: HelperService;
  private fileService: FileService;

  constructor() {
    this.helperService = new HelperService();
    this.fileService = new FileService();
  }

  getHelpers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const helpers = await this.helperService.getAllHelpers();
      successHandler(res, helpers, "helpers fetched successfully");
    } catch (error: any) {
      error.message = "failed to fetch helpers";
      error.statusCode = 500;
      next(error);
    }
  };

  addHelper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const helper = {
        id: Number(req.body.id),
        name: req.body.name,
        role: req.body.role,
        employeeCode: req.body.employeeCode,
        gender: req.body.gender,
        languages: req.body.languages,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId,
        vehicle: req.body.vehicle,
        vehicleNumber: req.body.vehicleNumber,
        organization: req.body.organization,
        joinedOn: req.body.joinedOn,
        imageUrl: req.body.imageUrl,
        additionalDocument: {
          category: req.body.additionalDocument?.category || "",
          fileName: req.body.additionalDocument?.fileName || "",
        },
        kycDocument: {
          category: req.body.kycDocument?.category || "",
          fileName: req.body.kycDocument?.fileName || "",
        },
      };

      if (req.file) {
        try {
          helper.imageUrl = await this.fileService.uploadToCloudinary(
            req.file.path,
            "helpers"
          );
        } catch (error: any) {
          error.statusCode = 500;
          error.message = "upload Failed";
          next(error);
        }
      }

      const savedHelper = await this.helperService.addHelper(helper);
      successHandler(res, savedHelper, "helper added successfully");
    } catch (error: any) {
      error.message = "failed to add Helper";
      error.statusCode = 500;
      next(error);
    }
  };

  getHelperById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const helper = await this.helperService.getHelperById(id);

      if (!helper) {
        const error: any = new Error("Helper not found");
        error.statusCode(400);
        return next(error);
      }

      successHandler(res, helper, "helper fetched by id");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "error fetching helper";
      next(error);
    }
  };

  deleteHelper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deletedHelper = await this.helperService.deleteHelper(id);

      if (!deletedHelper) {
        const error: any = new Error("helper not found");
        error.statusCode = 400;
        return next(error);
      }

      successHandler(res, deletedHelper, "helper deleted successfully");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "error in deleting helper";
      next(error);
    }
  };

  updateHelper = async (req: Request, res: Response, next: NextFunction) => {
    const helperId = parseInt(req.params.id);
    try {
      const updatedData = {
        id: req.body.id,
        name: req.body.name,
        role: req.body.role,
        imageUrl: req.body.imageUrl || "",
        employeeCode: req.body.employeeCode,
        gender: req.body.gender,
        languages: req.body.languages,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId,
        type: req.body.role,
        organization: req.body.organization,
        joinedOn: req.body.joinedOn,
        vehicle: req.body.vehicle || "none",
        vehicleNumber: req.body.vehicleNumber || "",
        additionalDocument: {
          category: req.body.additionalDocument?.category || "",
          fileName: req.body.additionalDocument?.fileName || "",
        },
        kycDocument: {
          category: req.body.kycDocument?.category || "",
          fileName: req.body.kycDocument?.fileName || "",
        },
      };

      if (req.file) {
        try {
          updatedData.imageUrl = await this.fileService.uploadToCloudinary(
            req.file.path,
            "helpers"
          );
        } catch (error: any) {
          error.statusCode = 500;
          error.message = "upload Failed";
          next(error);
        }
      }

      const updatedHelper = await this.helperService.updateHelper(
        helperId,
        updatedData
      );

      if (!updatedHelper) {
        const error: any = new Error("helper not found");
        error.statusCode = 400;
        return next(error);
      }

      successHandler(res, updatedHelper, "helper updated successfully");
    } catch (error: any) {
      error.statusCode = 500;
      error.message = "faled to update Helper";
      next(error);
    }
  };
}
