const crypto = require('crypto');



var tokenizer = () => {}

tokenizer.getToken = (next) => {
    crypto.randomBytes(48, (err ,buffer) => {
        next(buffer.toString('hex'));
    });
}

exports.tokenizer = tokenizer;