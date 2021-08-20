const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function moviesByTheater(theater_id){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .distinct("m.*")
        .where({"mt.theater_id": theater_id}) 
};

function list(){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .distinct("t.*" );
};

module.exports = {
    list, 
    moviesByTheater,
};