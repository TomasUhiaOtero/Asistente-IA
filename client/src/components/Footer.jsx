import React from 'react'
import Swal from 'sweetalert2'

const Footer = () => {

    //Clic en contacto con swal2
    function handleClicContact() {
        Swal.fire({
            title: 'Contacto',
            html: `
              <p><strong>Teléfono:</strong> +34 698 10 73 75</p>
              <p><strong>Email:</strong> uhiaoterotomas@gmail.com </p>
            `,
            icon: 'info',
            confirmButtonText: 'Cerrar',
            background: '#1e293b', // Tailwind slate-800
            color: '#f1f5f9', // Tailwind slate-100
            confirmButtonColor: '#3b82f6', // Tailwind blue-500
        })
    }

    //Clic en contacto con swal2
    function handleClicCv() {
        Swal.fire({
            title: "A continuación se descargará mi Curriculum",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: `Cancelar`,
            background: '#1e293b', // Tailwind slate-800
            color: '#f1f5f9', // Tailwind slate-100
            confirmButtonColor: '#3b82f6', // Tailwind blue-500
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Descargando...", "", "success");
                const link = document.createElement("a")
                link.href = "/TomasUhiaOteroResume.pdf"
                link.download = "TomasUhiaOteroResume.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } else if (result.isDenied) {
                Swal.fire("Cancelado :(", "", "info");
            }
        });
    }

    return (
        <div className='fixed bottom-0 left-0 w-full text-slate-500 flex flex-row justify-center items-center gap-6 p-4'>
            <span onClick={handleClicContact} className='cursor-pointer hover:text-white hover:scale-110 transition-transform duration-200 ease-out hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
                Contact
            </span>
            <span onClick={handleClicCv} className='cursor-pointer hover:text-white hover:scale-110 transition-transform duration-200 ease-out hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
                CV
            </span>
            <a
                href='https://www.linkedin.com/in/tom%C3%A1s-uh%C3%ADa-otero-b10748345/'
                target='_blank'
                rel="noopener noreferrer"
                className='cursor-pointer hover:text-white hover:scale-110 transition-transform duration-200 ease-out hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
                Linkedin
            </a>
            <a
                href='https://github.com/TomasUhiaOtero'
                target='_blank'
                rel="noopener noreferrer"
                className='cursor-pointer hover:text-white hover:scale-110 transition-transform duration-200 ease-out hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
                Github
            </a>

        </div>
    )
}

export default Footer