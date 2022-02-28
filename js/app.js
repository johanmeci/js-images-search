const result = document.querySelector('#resultado'),
      form = document.querySelector('#formulario'),
      paginationDiv = document.querySelector('#paginacion'),
      resultPerPage = 40;

let totalPages;
let iterator;
let actualPage = 1;

window.onload = () => {
    form.addEventListener('submit', validateForm);
}

//Generator
function *createPaginator(total) {

    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function validateForm(e) {
    e.preventDefault();

    const inputSearch = document.querySelector('#termino').value;

    if (inputSearch === '') {
        showAlert('Agrega un término de búsqueda');
        return;
    }

    searchImages();
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

function searchImages() {
    
    const search = document.querySelector('#termino').value;
    const key = '11453267-5a15ad37ad6d97ed277286564';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${resultPerPage}&page=${actualPage}`;

    fetch(url)
        .then( response => response.json())
        .then( result => {

            totalPages = calcPages(result.totalHits);
            console.log(totalPages);
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
        <div class='card-container w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4'>
            <div class='bg-white card-body'>
                <img class='w-full card-img' src='${previewURL}' />
                <div class='p-4 card-txt'>
                    <div class='font-bold div-likes'>
                        <img class='icon-like' src='/img/like.svg' />
                        <span class='txt-likes'>${likes} </span>
                    </div>
                    <div class='font-bold div-views'>
                        <img class='icon-view' src='/img/view.svg' />
                        <span class='txt-views'>${views} </span>
                    </div>
                </div>
                <a class='btn-link w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1' href='${largeImageURL}' target='_blank' rel='noopener noreferrer'>Ver Imagen</a>
            </div>
        </div>
        `;
    });

    while (paginationDiv.firstChild) {
        paginationDiv.removeChild(paginationDiv.firstElementChild);
    }

    showIterator();

}

function showIterator() {
    iterator = createPaginator(totalPages);

    while (true) {
        const { value, done } = iterator.next();
        if (done) return;

        const btnPagination = document.createElement('a');
        btnPagination.href = '#';
        btnPagination.dataset.page = value;
        btnPagination.textContent = value;
        btnPagination.classList.add('btn-next', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'uppercase', 'rounded');

        btnPagination.onclick = () => {
            actualPage = value;

            searchImages();
        }

        paginationDiv.appendChild(btnPagination);
    }
}

function calcPages(total) {
    return parseInt(Math.ceil(total / resultPerPage));
}