const dateFormat = require('./dateFormat');
exports.updated_at = function(){
    const updated_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    return updated_at;
};

exports.created_at = function(){
    const created_at = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    return created_at;
};

exports.datahora = function(){
    let datahora = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s');
    return datahora;
};