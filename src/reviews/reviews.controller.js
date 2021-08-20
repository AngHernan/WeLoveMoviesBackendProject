const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

  


async function reviewExists(req, res, next){
    const review = await reviewsService.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next()
    }
    next({status: 404, message: "Review cannot be found."});
};

async function readMovieReview(req, res){
  const reviews = await reviewsService.readMovieReview(req.params.movieId);
  const critics = await reviewsService.listCritics();
  const data = reviews.map((review) => {
    const foundCritic = {
      critic: critics.find((critic) => critic.critic_id === review.critic_id),
    };
    return { ...review, ...foundCritic };
  });
    res.json({data});
};

async function update(req, res){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id, 
    };
    await reviewsService.update(updatedReview);
    const data = await reviewsService.readUpdatedReview(res.locals.review.review_id);
    res.json({data});
};

async function destroy(req, res){
    const { review } = res.locals;
    await reviewsService.destroy(review.review_id);
    res.sendStatus(204);
};

module.exports = {
    readMovieReview: [asyncErrorBoundary(readMovieReview)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};