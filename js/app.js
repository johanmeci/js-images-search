const result = document.querySelector('#resultado'),
      form = document.querySelector('#formulario');


window.onload = () => {
    form.addEventListener('submit', validateForm);
}

function validateForm(e) {
    e.preventDefault();

    const inputSearch = document.querySelector('#termino').value;

    if (inputSearch === '') {
        showAlert('Agrega un término de búsqueda');
        return;
    }

    searchImage(inputSearch);
}

function showAlert(msg) {

    const checkAlert = document.querySelector('.msg-error');

    if (!checkAlert) {

        const alertMsg = document.createElement('p');
        alertMsg.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'msg-error');

        alertMsg.innerHTML = `
            <strong class='font-bold'>Error:</strong>
            <span class='block sm:inline'>${msg}</span>
        `;

        form.appendChild(alertMsg);

        setTimeout(() => {
            alertMsg.remove();
        }, 2500);

    }
}

function searchImage(search) {
    
    const key = '11453267-5a15ad37ad6d97ed277286564';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=100`;

    fetch(url)
        .then( response => response.json())
        .then( result => {
            showImages(result.hits);
        });
}

function showImages(images) {
    
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

    images.forEach(img => {

        const { previewURL, likes, views, largeImageURL } = img;

        result.innerHTML += `
        <div class='w-1/2 md:w-1/3 lg:w-1/4  p-3 mb-4'>
            <div class='bg-white'>
                <img class='w-full' src='${previewURL}' />
                <div class='p-4'>
                    <p class='font-bold'>${likes} <span class='font-light'>Me gusta</span></p>
                    <p class='font-bold'>${views} <span class='font-light'>Vistas</span></p>

                    <a class='w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1' href='${largeImageURL}' target='_blank' rel='noopener noreferrer'>Ver Imagen</a>
                <div>
            <div>
        <div>
        `
    });
}