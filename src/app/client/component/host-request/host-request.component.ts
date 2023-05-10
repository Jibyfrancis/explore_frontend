import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HostDetails } from 'src/app/models/hostModel';

export interface User {
  _id: string;
  userName: string;
  email: string;
  mobile: string;
  password: string;
  isBlocked: boolean;
  isGoogleUser: boolean;
  photoUrl: string;
  isHosted: boolean;
  hostingRequest: Boolean;
}

@Component({
  selector: 'app-host-request',
  templateUrl: './host-request.component.html',
  styleUrls: ['./host-request.component.css'],
})
export class HostRequestComponent implements OnInit {
  hostingApproval: boolean = false;
  isHosted!: boolean;
  hostrDetailsForm!: FormGroup;
  user!: User;
  currentUserId!: string ;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('user');

    if (data) {
      const userData = JSON.parse(data);
      const userId = userData?.user._id;
      this.currentUserId=userId
      console.log(this.currentUserId);
      this.hostrDetailsForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        userId: [userId],
        dataOfBirth: ['', Validators.required],
        aadharNumber: ['', Validators.required],
        panCardNumber: ['', Validators.required],
      });

      this.userService.findUser(userId).subscribe((res: any) => {
        if (res.user) {
          this.user = res.user;
          console.log(this.user);
        }
      });

    }
  }

  submit() {
    if (this.hostrDetailsForm.valid) {
      const data: HostDetails = this.hostrDetailsForm.value;
      this.userService.createHostRequest(data).subscribe((res: any) => {
        this.userService.findUser(this.user._id).subscribe((userRes: any) => {
          if (userRes.user) {
            this.user = userRes.user;
            console.log(this.user);
            this.cd.detectChanges();
          }
        });

      });
    }
  }
}
