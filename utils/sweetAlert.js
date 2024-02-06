import Swal from 'sweetalert2'
import "sweetalert2/dist/sweetalert2.min.css";


export default function useSweetAlert(options) {
    return Swal.fire(options)
}