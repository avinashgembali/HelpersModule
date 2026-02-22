import { Helper } from "../models/helper.model";

export class HelperService {
  async getAllHelpers() {
    return await Helper.find();
  }

  async addHelper(data: any) {
    const newHelper = new Helper(data);
    return await newHelper.save();
  }

  async getHelperById(id: number) {
    return await Helper.findOne({ id });
  }

  async deleteHelper(id: number) {
    return await Helper.findOneAndDelete({ id });
  }

  async updateHelper(id: number, updatedData: any) {
    return await Helper.findOneAndUpdate({ id }, updatedData, { new: true });
  }
}
