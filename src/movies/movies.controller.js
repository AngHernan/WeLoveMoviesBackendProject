const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list (req, res){
    const isShowing = req.query.is_showing; 
    const data = isShowing? await moviesService.isShowingList() :
    await moviesService.list(); 
    res.json({data});
};

async function movieExists(req, res, next){
    const movieList = await moviesService.read(req.params.movieId);
    const movie = movieList[0];
    if (movie) {
        res.locals.movie = movie;
        return next(); 
    };
    next({status: 404, message: "Movie cannot be found."});
};

async function read(req, res){
    const { movie: data} = res.locals;
    res.json({ data: data });
};

module.exports = {
    movieExists: [asyncErrorBoundary(movieExists)],
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};