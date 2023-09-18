import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  projectList!: any[];
  dataSource: any;
  loader: boolean = true;

  constructor(
    // private userService: UserService,
    // private toast: ToastrService,
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
        // console.log("Error in Project List");
        // console.log(error?.error);
        this.handler.handle(error);
        setTimeout(() => {
          this.loader = false;
        }, 1500);
      },
      // this.dataSource = new MatTableDataSource<any>(this.projectList);
    });
  }
}
