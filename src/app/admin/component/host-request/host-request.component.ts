import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';

export interface Host {
  fullName: string;
  userId: string;
  dateOfBirth: String;
  aadharNumber: String;
  pancardNumber: String;
  approved: boolean
}

@Component({
  selector: 'app-host-request',
  templateUrl: './host-request.component.html',
  styleUrls: ['./host-request.component.css'],
})
export class HostRequestComponent implements OnInit {
  
  hosts: MatTableDataSource<Host> = new MatTableDataSource<Host>();
  length: number = 0
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.getAllHostRequest().subscribe((res) => {
      console.log(res);

      const hosts: Host[] = res.hosts.map((host: Host) => ({
        fullName: host.fullName,
        userId: host.userId,
        dateOfBirth: host.dateOfBirth,
        aadharNumber: host.aadharNumber,
        pancardNumber: host.pancardNumber,
        approved: host.approved

      }))
      this.hosts = new MatTableDataSource(hosts)
      this.length = res.hosts.length
    })
  }

  approve(id: string) {
    this.adminService.approveHostRequest(id).subscribe((res) => {
      console.log(res);
      const index = this.hosts.data.findIndex((host) => host.userId === id);
      console.log(index);

      if (index !== -1) {
        this.hosts.data.splice(index, 1);
        this.hosts = new MatTableDataSource(this.hosts.data);
      }
    })
  }

  reject(id: string) {

  }
}
