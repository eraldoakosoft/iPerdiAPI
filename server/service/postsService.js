const postData = require('../data/postsData');

exports.savePost = function(post){
    return postData.savePost(post);
};