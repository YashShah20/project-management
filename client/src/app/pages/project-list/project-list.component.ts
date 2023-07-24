import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, AfterViewInit {

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  projectList!: any[];
  dataSource: any

  constructor(private userService: UserService, private projectService: ProjectService, private toast: ToastrService) {}
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.projectService.getProjects(1, 10).subscribe((projects) => {
      this.projectList = projects;
      // this.dataSource = new MatTableDataSource<any>(this.projectList);
    })
  }

}
