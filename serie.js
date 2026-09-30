/*
3. (3pts) Crear en el archivo serie.js la clase Serie con:
a. Atributos: id (number), url (string), name (string), language (string), genres (array de string), image (string).
b. Constructor. Debe tomar y asignar todos los datos.
c. Métodos: 
i. toJsonString(). De instancia. Devuelve un string json que representa al objeto. 
ii. createFromJsonString(json) De clase. Devuelve una instancia de la clase serie creada con los datos provenientes del parámetro json de tipo string. 
iii. createHtmlElement(). De instancia. Devuelve un elemento HTML que permita mostrar del documento los datos: name, lenguaje, genres e image.
*/ 

class Serie{
    constructor(id, url, name, language, genres, image){
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static createFromJsonString(jsonString){
        const data = JSON.parse(jsonString);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    createHtmlElement(){
        const card = document.createElement("article");

        const imgElement = document.createElement("img");
        imgElement.src = this.image;
        imgElement.alt = "Imagen de la serie" + this.name;
        imgElement.style.width = "100%";
        card.appendChild(imgElement);

        const tituloElement = document.createElement("h3");
        tituloElement.textContent = this.name;
        card.appendChild(tituloElement);

        const languageElement = document.createElement("p");
        languageElement.textContent = "Idioma" + this.language;
        card.appendChild(languageElement);

        const genresElement = document.createElement("p");
        genresElement.textContent = "Genero: " + this.genres.join(", ");
        card.appendChild(genresElement);

        return card;
    }
}
