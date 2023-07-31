import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent implements OnInit, AfterViewInit {
  projectList!: any[];
  dataSource: any;
  loader: boolean = true;

  constructor(
    // private toast: ToastrService,
    // private userService: UserService,
    private projectService: ProjectService,
    private handler: ErrorHandlerService
  ) {}

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.projectService.getProjects(1, 10).subscribe({
      next: (projects) => {
        this.projectList = projects;
        this.loader = false;
      },
      error: (error) => {
        // console.log('Error in Project List');
        // console.log(error?.error);
        setTimeout(() => {
          this.loader = false;
        }, 1500);
        this.handler.handle(error);
      },
      // this.dataSource = new MatTableDataSource<any>(this.projectList);
    });
  }
}
