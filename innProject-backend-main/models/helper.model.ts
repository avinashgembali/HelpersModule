import mongoose, { Schema, Document } from "mongoose";

export interface Helper extends Document {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  employeeCode: string;
  gender: string;
  languages: string[];
  mobileNo: string;
  emailId: string;
  type: string;
  organization: string;
  joinedOn: string;
  vehicle : string;
  vehicleNumber : string;
  additionalDocument: {
    category: string;
    fileName: string;
  };
  kycDocument: {
    category: string;
    fileName: string;
  };
}

const HelperSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  employeeCode: { type: String, required: true },
  gender: { type: String, required: true },
  languages: { type: [String], required: true },
  mobileNo: { type: String, required: true },
  emailId: { type: String},
  organization: { type: String, required: true },
  joinedOn: { type: String, required: true },
  vehicle: { type: String, default: 'none' },           
  vehicleNumber: { type: String, default: '' },         
  additionalDocument: {
    category: { type: String },
    fileName: { type: String },
  },
  kycDocument: {
    category: {type : String},
    fileName: {type : String},
  }
});

export const Helper = mongoose.model<Helper>("Helper", HelperSchema);
