document.addEventListener("DOMContentLoaded", () => {
    const contenedorSeries = document.getElementById("series");
    const btnOrdenarNombre = document.getElementById("btn-ordenar-nombre");
    const btnOrdenarId = document.getElementById("btn-ordenar-id");

    let listaGuardadas = [];

    function obtenerGuardados() {
        const datosEnStorage = localStorage.getItem("seriesGuardadas");

        if (datosEnStorage) {
            const arrayObjetos = JSON.parse(datosEnStorage);
            listaGuardadas = [];

            for (let i = 0; i < arrayObjetos.length; i++) {
                const item = arrayObjetos[i];
                const instanciaSerie = new Serie(
                    item.id,
                    item.url,
                    item.name,
                    item.language,
                    item.genres,
                    item.image
                );
                listaGuardadas.push(instanciaSerie);
            }
        }
    }

    function renderizarSeries(lista) {
        if (!contenedorSeries) {
            return;
        }

        contenedorSeries.innerHTML = "";

        if (lista.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay series guardadas.";
            contenedorSeries.appendChild(mensaje);
            return;
        }

        for (let i = 0; i < lista.length; i++) {
            const tarjetaHtml = lista[i].createHtmlElement();
            contenedorSeries.appendChild(tarjetaHtml);
        }
    }

    function ordenarPorNombre() {
        listaGuardadas.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
        renderizarSeries(listaGuardadas);
    }

    function ordenarPorId() {
        listaGuardadas.sort((a, b) => {
            return a.id - b.id;
        });
        renderizarSeries(listaGuardadas);
    }

    if (btnOrdenarNombre) {
        btnOrdenarNombre.addEventListener("click", ordenarPorNombre);
    }

    if (btnOrdenarId) {
        btnOrdenarId.addEventListener("click", ordenarPorId);
    }

    obtenerGuardados();
    renderizarSeries(listaGuardadas);
});