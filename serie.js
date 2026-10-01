class Serie {
    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(jsonString) {
        const data = JSON.parse(jsonString);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    static guardarSerie(serie) {
        let listaGuardadas = [];
        const datosEnStorage = localStorage.getItem("seriesGuardadas");

        if (datosEnStorage) {
            listaGuardadas = JSON.parse(datosEnStorage);
        }
        
        listaGuardadas.push(serie);

        localStorage.setItem("seriesGuardadas", JSON.stringify(listaGuardadas));
        console.log("Se Guardo en LocalStorage: " + serie.name);
    }

    createHtmlElement() {
        const card = document.createElement("article");
        card.className = "card shadow-sm h-100 p-3";

        const enlaceElement = document.createElement("a");
        enlaceElement.href = this.url;
        enlaceElement.target = "_blank";

        const imgElement = document.createElement("img");
        imgElement.src = this.image;
        imgElement.alt = "Imagen de la serie " + this.name;
        imgElement.className = "card-img-top img-fluid rounded";
        imgElement.style.height = "300px";
        imgElement.style.objectFit = "cover";
        
        enlaceElement.appendChild(imgElement);
        card.appendChild(enlaceElement);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        const tituloElement = document.createElement("h3");
        tituloElement.textContent = this.name;
        tituloElement.className = "card-title h5 text-dark fw-bold";
        cardBody.appendChild(tituloElement);

        const languageElement = document.createElement("p");
        languageElement.textContent = "Idioma: " + this.language;
        languageElement.className = "card-text mb-1 text-muted";
        cardBody.appendChild(languageElement);

        const genresElement = document.createElement("p");
        let textoGeneros = "Sin Genero";
        if (this.genres) {
            textoGeneros = this.genres.join(", ");
        }
        genresElement.textContent = "Genero: " + textoGeneros; 
        genresElement.className = "card-text mb-3 text-muted";
        cardBody.appendChild(genresElement);

        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "guardar";
        btnGuardar.className = "btn btn-primary mt-auto";

        btnGuardar.addEventListener("click", () => {
            Serie.guardarSerie(this);
            alert("Serie guardada con éxito: " + this.name);
        });

        cardBody.appendChild(btnGuardar);
        card.appendChild(cardBody);

        return card;
    }
}
