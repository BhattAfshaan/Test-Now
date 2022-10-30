import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
   messages = {
        Success:"Success",
        Confirm : "Confirm",
        SuccessIcon : "success",
        ConfirmIcon : "question",
        SuccessMessage : "Action perform successfully",
        ConfirmMessage : "Are you sure to perform this action?",
        ConfirmButton : "Confirm",
        SuccessButton: "Done",
    }
  constructor() { }

  showSuccessAlert(callback: () => void, isSuccess: boolean) {
    Swal.fire ({
      title: isSuccess ? this.messages.Success : this.messages.Confirm,
      text: isSuccess ? this.messages.SuccessMessage : this.messages.ConfirmMessage,
      icon: isSuccess ? this.messages.SuccessIcon : this.messages.ConfirmIcon as any,
      showConfirmButton: true,
      confirmButtonText: isSuccess ? this.messages.SuccessButton : this.messages.ConfirmButton,
      backdrop: true,
      allowOutsideClick: false
    }).then((value) => {
        if(value.isConfirmed) {
        callback()
        }
    })
  }

  showErrorAlert() {
    // Swal.fire({
    //   title: 'Error',
    //   text: 'Some error occurred',
    //   icon: 'error',
    //   showConfirmButton: true,
    //   confirmButtonText: 'Ok',
    //   backdrop: true,
    //   allowOutsideClick: false
    // })
  }
  
}
