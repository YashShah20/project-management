import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  loader: boolean = true;
  updateForm!: FormGroup;
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private projectService: ProjectService, private route: ActivatedRoute, private toast: ToastrService, private router: Router) {
    
  }

  openModal(content: any) {
    const modalRef: NgbModalRef = this.modalService.open(content, { centered: true });
    modalRef.result.then(
      (result) => {
        // Handle modal close with result (form data)
        if (result === 'cancel') {
          console.log('Form submission canceled.');
        } else {
          console.log('Form data:', result);
          // You can perform further actions here, like saving the data to the database.
        }
      },
      (reason) => {
        // Handle modal dismissal (e.g., cancel button clicked)
        console.log('Modal dismissed:', reason);
      }
    );
  }


  dismissModal() {
    // this.activeModal.dismiss('cancel');
  }

  saveForm() {
    // if (this.updateForm.valid) {
    //   this.activeModal.close(this.updateForm.value);
    // }
  }

  openFormUpdateModal(modal: any, form: any = this.projectDetails) {
    this.modalService.open(modal, { size: "sm" });
    this.initializeModal(form);
  }

  initializeModal(projectDetails: any) {
    console.log(projectDetails);
    
    this.updateForm = this.formBuilder.group({
      id: [projectDetails?.id],
      title: [projectDetails?.title, Validators.required],
      description: [projectDetails?.description, Validators.required],
      start_date: [projectDetails?.start_date, Validators.required],
      // status: 
      status: [projectDetails?.status, Validators.required]

    });
  }

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
        this.loader = true;
        
        this.projectDetails = projectDetails
        console.log(projectDetails);
        

        this.projectDevlopers = projectDetails['project_users'].map((x: { first_name: string; last_name: string; role_title: string; }) => {
          if(x.role_title === 'lead') {
            this.projectLead = x.first_name + " " + x.last_name
          }
          return " " + x.first_name + " " + x.last_name
        })
      },
      error: (err) => {
        this.loader = true;
        this.toast.error(err?.error, 'ERROR!')
        this.router.navigate(['/user/user-projects'])
      },
      complete: () => {
        this.loader = false;
      }
    })
    
  }
  
}
