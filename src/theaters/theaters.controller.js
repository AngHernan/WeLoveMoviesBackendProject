const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesController = require("../movies/movies.controller");

async function list(req, res){
    const result = await theatersService.list();
    res.json({data: await Promise.all(result.map( async (item) => { 
        const movies = await theatersService.moviesByTheater(item.theater_id); 
        item.movies = movies;
        return item}))
    });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
  };