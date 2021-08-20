const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname"
});

function listCritics(){
  return knex("critics").select("*");
};

function read(id){
    return knex("reviews as r")
        .select("r.*")
        .where({"r.review_id": id})
        .first();
};

function readUpdatedReview(id){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id" )
        .select("*")
        .where({review_id: id})
        .first()
        .then(addCritic);
};

function readMovieReview(movieId){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id" )
        .join("movies as m", "m.movie_id", "r.movie_id")
        .distinct("r.*")
        .where({"r.movie_id": movieId});
};

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview);
};

function destroy(id){
    return knex("reviews")
        .where({review_id: id})
        .del();
};

module.exports = {
    read,
    readMovieReview,
    listCritics,
    readUpdatedReview,
    update,
    destroy,
};