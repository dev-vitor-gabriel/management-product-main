
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const confirmAlert = async ({title, text, icon='warning', handleFunction}) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showDenyButton: true,
        confirmButtonColor: 'var(--primary-bg-color)',
        cancelButtonColor: 'var(--danger)',
        confirmButtonText: 'Sim',
        denyButtonText: 'Não'
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleFunction();
        }
      })
}

export { confirmAlert };
