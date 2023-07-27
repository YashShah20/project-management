import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit, AfterViewInit {

  projectList!: any[];
  dataSource: any
  loader: boolean = true

  constructor(private userService: UserService, private projectService: ProjectService, private toast: ToastrService) {}


  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.projectService.getProjects(1, 10).subscribe({
      next: (projects) => {
        this.projectList = projects;
        this.loader = false
      },
      error: (err) => {
        console.log("Error in Project List");
        console.log(err?.error);
        this.toast.error(err?.error, 'Error!!')
        setTimeout(() => {
          this.loader = false
        }, 1500)
      }
      // this.dataSource = new MatTableDataSource<any>(this.projectList);
    })
  }

}
