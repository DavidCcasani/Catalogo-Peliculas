import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = 'dbezo9ehh';
  private uploadPreset = 'Imagenes';

  constructor(private http: HttpClient) {}

  async subirImagen(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const response: any = await lastValueFrom(this.http.post(url, formData));
    return response.secure_url;
  }
}
