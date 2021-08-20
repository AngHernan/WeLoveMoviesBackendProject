const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
};

function isShowingList() {
    return knex("movies as m")
        .join("movies_theaters as mt" , "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({"mt.is_showing": true});
};

function read(id){
    return knex("movies as m")
        .select("m.*")
        .where({"movie_id": id});
};

module.exports = {
    list,
    read,
    isShowingList,
};