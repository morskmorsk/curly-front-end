import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // For forms
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  deviceData = {
    name: '',
    device_model: '',
    imei: '',
    serial_number: '',
    description: '',
    defect: '',
    notes: '',
    carrier: '',
    estimated_value: 0,
    passcode: '',
    repair_price: 0
  };

  locations = [];
  departments = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getLocations().subscribe((data: any) => {
      this.locations = data;
    });

    this.apiService.getDepartments().subscribe((data: any) => {
      this.departments = data;
    });
  }

  addDevice() {
    this.apiService.addDevice(this.deviceData).subscribe(() => {
      this.router.navigate(['/devices']);
    });
  }

  cancel() {
    this.router.navigate(['/devices']);
  }
}