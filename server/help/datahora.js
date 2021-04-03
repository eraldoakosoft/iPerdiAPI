const dateFormat = require('./dateFormat');
const created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');

exports.updated_at = function(){
    return updated_at;
};

exports.created_at = function(){
    return created_at;
};