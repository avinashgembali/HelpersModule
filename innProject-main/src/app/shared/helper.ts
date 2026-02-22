export interface Helper {
  id: number;
  name: string;
  role: string;
  profile : File;
  imageUrl: string;
  employeeCode: string;
  gender: string;
  languages: string[];
  mobileNo: string;
  emailId: string;
  organization: string;
  joinedOn: string;
  vehicle?: string; 
  vehicleNumber?: string;
  kycDocument?: {
    category: string;
    fileName: string;
  };
  additionalDocument?: {
    category: string;
    fileName: string;
  };
}
