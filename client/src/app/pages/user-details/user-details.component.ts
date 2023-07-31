import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  loader: boolean = true
  
  constructor(
    private userService: UserService,
    // private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private handler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    let id: any;

    this.route.params.subscribe((para) => {
      id = para['user_id'];
    });

    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.user = res;

        this.loader = false;
      },
      error: (error) => {
        this.handler.handle(error)
        this.router.navigate(['/admin/users']);
        setTimeout(() => {
          this.loader = false
        }, 1500)
      },
    });
  }
}
