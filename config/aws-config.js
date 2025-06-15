const AWS = require("aws-sdk");
AWS.config.update({ egion: "ap-south-1" });

const s3 = new AWS.S3();
const S3_BUCKET = "";
module.exports = { s3, S3_BUCKET };
