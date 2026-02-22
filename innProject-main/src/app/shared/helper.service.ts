import { Helper } from './helper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  msg: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

  getHelpers(): Observable<ApiResponse<Helper[]>> {
    return this.http.get<ApiResponse<Helper[]>>(
      'http://localhost:3000/api/helpers'
    );
  }

  addHelper(helper: Helper): Observable<ApiResponse<Helper>> {
    const formData = new FormData();

    formData.append('id', helper.id.toString());
    formData.append('name', helper.name);
    formData.append('role', helper.role);
    formData.append('imageUrl', helper.imageUrl);
    formData.append('employeeCode', helper.employeeCode);
    formData.append('gender', helper.gender);
    formData.append('languages', JSON.stringify(helper.languages || []));
    formData.append('mobileNo', helper.mobileNo);
    formData.append('emailId', helper.emailId);
    formData.append('vehicle', helper.vehicle ?? '');
    formData.append('vehicleNumber', helper.vehicleNumber ?? '');
    formData.append('organization', helper.organization);
    formData.append('joinedOn', helper.joinedOn);

    if (helper.kycDocument) {
      formData.append('kycDocument', JSON.stringify(helper.kycDocument || {}));
    }

    if (helper.additionalDocument) {
      formData.append(
        'additionalDocument',
        JSON.stringify(helper.additionalDocument || {})
      );
    }

    if (helper.profile instanceof File) {
      formData.append('profile', helper.profile); // key name must match backend's expected field name
    }

    return this.http.post<ApiResponse<Helper>>(
      'http://localhost:3000/api/helpers',
      formData
    );
  }
  getHelperById(id: number): Observable<ApiResponse<Helper>> {
    return this.http.get<ApiResponse<Helper>>(
      `http://localhost:3000/api/helpers/${id}`
    );
  }

  updateHelper(
    id: number,
    updatedHelper: Helper
  ): Observable<ApiResponse<Helper>> {
    const formData = new FormData();

    formData.append('id', updatedHelper.id.toString());
    formData.append('name', updatedHelper.name);
    formData.append('role', updatedHelper.role);
    formData.append('imageUrl', updatedHelper.imageUrl || '');
    formData.append('employeeCode', updatedHelper.employeeCode);
    formData.append('gender', updatedHelper.gender);
    formData.append('languages', JSON.stringify(updatedHelper.languages || []));
    formData.append('mobileNo', updatedHelper.mobileNo);
    formData.append('emailId', updatedHelper.emailId);
    formData.append('vehicle', updatedHelper.vehicle ?? '');
    formData.append('vehicleNumber', updatedHelper.vehicleNumber ?? '');
    formData.append('organization', updatedHelper.organization);
    formData.append('joinedOn', updatedHelper.joinedOn);

    if (updatedHelper.kycDocument) {
      formData.append('kycDocument', JSON.stringify(updatedHelper.kycDocument));
    }
    if (updatedHelper.additionalDocument) {
      formData.append(
        'additionalDocument',
        JSON.stringify(updatedHelper.additionalDocument)
      );
    }

    // If a new image is selected
    if (updatedHelper.profile instanceof File) {
      formData.append('profile', updatedHelper.profile);
    }

    return this.http.put<ApiResponse<Helper>>(
      `http://localhost:3000/api/helpers/${id}`,
      formData
    );
  }

  deleteHelper(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `http://localhost:3000/api/helpers/${id}`
    );
  }
}
