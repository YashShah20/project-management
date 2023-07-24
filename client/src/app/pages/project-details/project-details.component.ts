import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit{

  projectDetails: any
  id!: number
  projectLead!: any
  projectDevlopers!: any[]
  
  constructor(private projectService: ProjectService, private route: ActivatedRoute, private toast: ToastrService, private router: Router) {}

  onClickUpdate() {
    this.projectService.updateProjectStatus(this.id, {
      status:4
    }).subscribe({
      next: (res) => {
        this.toast.success(`Project status Updated to ${res.status}`, 'Success')
        console.log(res);
      },
      error: (err) => {
        this.toast.error(err?.error, 'Error')
        console.log(err.error);
        
      },
      complete: () => {
        this.router.navigate(['/user/user-projects'])
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['project_id'];
        console.log("Project id", this.id);        
      }
    );

    this.projectService.getProjectById(this.id).subscribe({
      next: (projectDetails) => {
        this.projectDetails = projectDetails

        this.projectDevlopers = projectDetails['project_users'].map((x: { first_name: string; last_name: string; role_title: string; }) => {
          if(x.role_title === 'lead') {
            this.projectLead = x.first_name + " " + x.last_name
          }
          return " " + x.first_name + " " + x.last_name
        })
      },
      error: (err) => {
        this.toast.error(err?.error, 'ERROR!')
        this.router.navigate(['/user/user-projects'])
      }
    })

    
  }
  
}
