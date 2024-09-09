import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule

// Device interface to represent the structure of device objects
interface Device {
  id: number;
  name: string;
  device_model: string;
  imei: string;
  serial_number: string;
  description: string;
  defect: string;
  notes: string;
  carrier: string;
  estimated_value: number;
  passcode: string;
  repair_price: number;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [MatIconModule, CommonModule],  // Add CommonModule and MatIconModule here
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent {
  devices: Device[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    // Adjust the API call to handle paginated response
    this.apiService.getDevices().subscribe(
      (data: any) => {
        console.log(data);  // Check if the structure includes 'results'
        this.devices = data.results;  // Extract the devices from the 'results' array
      },
      (error: any) => {
        console.error('Error fetching devices', error);
      }
    );
  }

  addDevice() {
    this.router.navigate(['/add-device']);
  }

  editDevice(deviceId: number) {
    this.router.navigate([`/edit-device/${deviceId}`]);
  }

  deleteDevice(deviceId: number) {
    this.apiService.deleteDevice(deviceId).subscribe(() => {
      this.devices = this.devices.filter((device: Device) => device.id !== deviceId);
    });
  }
}