const AWS = require('aws-sdk');
const keys = require('../config/keys');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const bucket = 'ian-figuer-restoredb';
const action = 'putObject';
const contentType = 'image/jpeg';

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;
        const params = {
            Bucket: bucket,
            Key: key,
            ContentType: contentType
        };
        s3.getSignedUrl(action, params, (err, url) => {

            if (err) {
                console.log('Error: ', err);
            }
            
            res.send({
                key, url
            })
        });
    });
};