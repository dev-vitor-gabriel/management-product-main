
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const confirmAlert = async ({title, text, icon='warning', handleFunction}) => {
    MySwal.fire({
        title: 'Tem certeza disso?',
        text: "O registro será inativado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary-bg-color)',
        cancelButtonColor: '#666',
        confirmButtonText: 'Sim'
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleFunction();
        }
      })
}

export { confirmAlert };
