import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertOptions {
  title: string;
  text: string;
  icon: SweetAlertIcon;
  useTimer?: boolean;        // Parameter baru: mau pake timer atau tidak?
  timerDuration?: number;    // Durasi timer (default 1500)
  showConfirm?: boolean;
  isSuccess?: boolean;
  targetPath?: string;
  navigateFunc?: (path: string) => void; 
}

export const showAlert = ({ 
  title, 
  text, 
  icon, 
  useTimer = true,           // Default pakai timer
  timerDuration = 1500, 
  showConfirm = false,
  isSuccess, 
  targetPath, 
  navigateFunc 
}: AlertOptions) => {
    
    return Swal.fire({
        title,
        text,
        icon,
        // Jika useTimer false, kita set timer jadi undefined
        timer: useTimer ? timerDuration : undefined,
        timerProgressBar: useTimer, 
        showConfirmButton: showConfirm,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false, // Biar user tidak klik sembarangan saat error penting
        didOpen: () => {
            if (isSuccess && !targetPath) {
                Swal.showLoading();
            }
        }
    }).then((result) => {
        const isDismissedByTimer = result.dismiss === Swal.DismissReason.timer;
        
        if ((result.isConfirmed || isDismissedByTimer) && targetPath && navigateFunc) {
            navigateFunc(targetPath);
        }
    });
};