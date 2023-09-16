const { Router } = require('express');
const router = Router(); 

const fs = require('fs'); // Agrega el módulo fs
const path = require('path'); // Importa el módulo 'path' de Node.js
const filePath = path.join(__dirname, '../sample.json'); // Ruta completa al archivo JSON

// Requerir el archivo JSON utilizando la ruta completa
const movies = require(filePath);


router.get('/', (req, res) => {
    const movies = loadMoviesFromFile();
    res.json(movies);
});

router.post('/', (req, res) => {
    const { title, director } = req.body;
    if(title && director){
        const id = movies.length + 1;
        const newMovie = {...req.body, id};

        const movies = loadMoviesFromFile(); // Cargar los datos actuales desde el archivo

        movies.push(newMovie);

        // Guarda el arreglo actualizado en el archivo
        saveMoviesToFile();
        res.json(movies);
    } else {
        res.status(400).json({ error: 'Solicitud incorrecta' });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const movies = loadMoviesFromFile(); // Cargar los datos actuales desde el archivo

    // Encuentra el índice de la película con el ID proporcionado
    const movieIndex = movies.findIndex(movie => movie.id == id);

    if (movieIndex !== -1) {
        // Si se encuentra la película, elimínala del arreglo
        movies.splice(movieIndex, 1);
        // Guarda el arreglo actualizado en el archivo
        saveMoviesToFile();
        res.json(movies);
    } else {
        // Si no se encuentra la película, devuelve un mensaje de error
        res.status(404).json({ error: 'No se encontró una película con el ID proporcionado' });
    }
});

router.put('/:id', (req, res) => {

    const { title, director } = req.body;
    const { id } = req.params;

    const movies = loadMoviesFromFile(); // Cargar los datos actuales desde el archivo

    // Encuentra el índice de la película con el ID proporcionado
    const movieIndex = movies.findIndex(movie => movie.id == id);

    if(movieIndex !== -1){
        // Actualizar los datos de la película
        movies[movieIndex].title = title;
        movies[movieIndex].director = director;
        
        saveMoviesToFile(movies); // Guardar los datos actualizados en el archivo
        res.json(movies);
    } else {
        res.status(400).json({ error: 'Solicitud incorrecta' });
    }
});

// Función para guardar el arreglo movies en el archivo JSON
function saveMoviesToFile() {
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2), 'utf-8');
}

// Función para cargar los datos desde el archivo JSON
function loadMoviesFromFile() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = router;