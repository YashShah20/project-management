import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { UserService } from 'src/app/services/user.service';
import { PROJECT_STATUS } from 'src/app/utils';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  projectDetails: any;
  id!: number;
  projectLead!: any;
  projectDevlopers!: any[];
  loader: boolean = true;
  updateForm!: FormGroup;
  allDevList: any[] = [];
  selectedDevList: any[] = [];
  selectedDevNameList: any[] = [];

  taskList: any[] = [];

  allRoles: any[] = [];
  allProfiles: any[] = [];

  updateProjectUserForm!: FormGroup;
  addProjectUserForm!: FormGroup;

  projectStatusOptions: any[] = PROJECT_STATUS;

  tabs: string [] = ['Details','Developers', 'Tasks', 'Issues'];
  activatedTabIndex: number = 0;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
    private userRoleService: UserRolesService,
    private userProfileService: UserProfilesService,
    private handler: ErrorHandlerService
  ) {}

  

  dismissModal() {
    this.selectedDevList = [];
    this.selectedDevNameList = [];
    this.modalService.dismissAll();
  }

  updateProject() {
    this.projectService
      .updateProject(this.id, this.updateForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success('Project Update Successfully', 'Updated');

          this.modalService.dismissAll();
        },
        error: (error) => {
          this.handler.handle(error);
          // console.log(this.updateForm);
          // console.log(err.error);
        },
        complete: () => {
          this.router.navigate(['/user/user-projects']);
        },
      });

    // this.projectService.updateProjectStatus(this.id, {
    //   status:4
    // }).subscribe({
    //   next: (res) => {
    //     this.toast.success(`Project status Updated to ${res.status}`, 'Success')
    //     console.log(res);
    //     console.log("Hi:", this.updateForm.controls['start_date']);
    //     this.dismissModal()

    //   },
    //   error: (err) => {
    //     this.toast.error(err?.error, 'Error')
    //     console.log(err.error);

    //   },
    //   complete: () => {
    //     this.router.navigate(['/user/user-projects'])
    //   }
    // });
  }

  openFormUpdateModal(modal: any, form: any = this.projectDetails) {
    this.modalService.open(modal, { size: 'lg' });
    this.initializeProjectUpdateModal(form);
  }

  initializeProjectUpdateModal(projectDetails: any) {
    console.log(projectDetails);

    this.updateForm = this.formBuilder.group({
      id: [{ value: projectDetails?.id, disabled: true }, Validators.required],
      title: [projectDetails?.title, Validators.required],
      description: [projectDetails?.description, Validators.required],
      start_date: [projectDetails?.start_date, Validators.required],
      end_date: [projectDetails?.end_date, Validators.required],
      status: [projectDetails?.status, Validators.required],
      lead_id: [1],
    });
  }

  onChangeStatus() {
    const statusValue = this.updateForm.get('status')?.value;
    console.log(statusValue);

    this.updateForm.get('status')?.setValue(statusValue);

    // You can now use the selectedStatusId as needed, e.g., save it to a variable or perform other actions.
  }

  openProjectUserUpdateModal(
    modal: any,
    form: any = this.projectDetails.project_users
  ) {
    this.modalService.open(modal, { size: 'lg' });
    this.initializeProjectUpdateModal(form);
  }

  updateProjectUser() {
    console.log("devList", this.selectedDevList);
    let val = {users: this.selectedDevList}    
    
    this.projectService.addProjectUsers(this.id, val).subscribe({
      next: (res) => {
        console.log("after", res);
        this.selectedDevList = [];
        this.selectedDevNameList = [];
      },
      error: (err) => {
        console.log("after", err);
      }
    })
    
  }

  openProjectTaskUpdateModal(modal: any, index: any, form: any = this.taskList) {
    this.modalService.open(modal, { size: 'lg' });
    this.initializeProjectUpdateModal(form[index]);
  }

  openAddProjectUserModal(modal: any, form: any = null) {
    this.modalService.open(modal, {size: "lg"})
    this.initializeAddProjectModal()
  }

  initializeAddProjectModal() {
    this.addProjectUserForm = this.formBuilder.group({
      user_id: [null, Validators.required],
      role_id: [null, Validators.required],
      profile_id: [null, Validators.required],
      join_date: [null, Validators.required],
      user_name: [{value: null, disabled: true}]
    })
  }

  nameFunction() {
    // this.addProjectUserForm.setValue({user_name: this.allDevList.find((user) => user.id == this.addProjectUserForm.get('user_id')?.value)})
    // console.log("this.id", this.addProjectUserForm.get('user_id')?.value);
    // this.selectedDevNameList.push(this.allDevList.filter((user) => user.id == this.addProjectUserForm.get('user_id')?.value).map((user) => user.first_name + " " + user.last_name))
    // this.addProjectUserForm.setValue({user_name: this.allDevList.filter((user) => user.id == this.addProjectUserForm.get('user_id')?.value).map((user) => user.first_name + " " + user.last_name)})
    
    this.addProjectUserForm.controls['user_name'].setValue(this.allDevList.filter((user) => user.id == this.addProjectUserForm.get('user_id')?.value).map((user) => user.first_name + " " + user.last_name))
    
    
  }

  addDeveloper() { 
    if(this.addProjectUserForm.valid && this.addProjectUserForm.dirty) {
      this.selectedDevList.push(this.addProjectUserForm.value)
      this.selectedDevNameList.push(this.allDevList.filter((user) => user.id == this.addProjectUserForm.get('user_id')?.value).map((user) => user.first_name + " " + user.last_name))
      this.toast.info('User added')
      this.addProjectUserForm.reset()
    } else {
      this.toast.warning("Please fill every field", 'Invalid Form!!')
    }

  }

  removeDeveloper() {
    this.selectedDevList = [];
    this.selectedDevNameList = [];
    this.toast.success('Developer Removed', 'Success')
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['project_id'];
      console.log('Project id', this.id);
    });

    this.projectService.getProjectById(this.id).subscribe({
      next: (projectDetails) => {
        this.loader = true;

        this.projectDetails = projectDetails;
        console.log(projectDetails);

        this.projectDevlopers = projectDetails['project_users'].map(
          (x: {
            first_name: string;
            last_name: string;
            role_title: string;
          }) => {
            if (x.role_title === 'lead') {
              this.projectLead = x.first_name + ' ' + x.last_name;
            }
            return ' ' + x.first_name + ' ' + x.last_name;
          }
        );
      },
      error: (error) => {
        this.loader = true;
        this.handler.handle(error);
        this.router.navigate(['/user/user-projects']);
      },
      complete: () => {
        this.loader = false;
      },
    });

    this.projectService.getTasksByProjectId(this.id).subscribe({
      next: (res) => {
        this.taskList = res;
        console.log(this.taskList);
      },
      error: (error) => {
        this.handler.handle(error);
      },
    });

    this.userService.fetchAllDevList().subscribe((devList) => {
      this.allDevList = <any[]>devList;
      console.log("Users: ", this.allDevList);
      
    })

    this.userRoleService.getRoles().subscribe((res) => {
      this.allRoles = res
    })

    this.userProfileService.getUserProfiles().subscribe(res => {
      this.allProfiles = res
    });
  }

  tabChange(tabIndex: number) {
    // debugger;
    this.activatedTabIndex = tabIndex;
  }

}
