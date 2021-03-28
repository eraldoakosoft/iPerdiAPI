const postData = require('../data/postsData');

exports.savePost = function(post){
    return postData.savePost(post);
};

exports.deletePost = function(id){
    return postData.deletePost(id);
};

exports.updatePost = function(id, post){
    return postData.updatePost(id, post);
};

exports.updateStatusPost = function(id, status){
    return postData.updateStatusPost(id, status);
};

exports.getPost = function(id){
    return postData.getPost(id);
};

exports.getPosts = function(){
    return postData.getPosts();
};