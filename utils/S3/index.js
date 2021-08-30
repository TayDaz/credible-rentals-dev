const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
      };
      // console.log(uploadParams);
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("[S3/.js] uploadFile ERROR", err);
          reject(false);
        }
        if (data) {
          // console.log("Upload Success", data.Location);
          return resolve(data);
        }
      });
    } catch (err) {
      console.log("[S3/.js] uploadFile ERROR", err);
      reject(false);
    }
    // return s3.upload(uploadParams).promise();
  });
}

// uploads a blob to s3
function uploadBlob(blob, key) {
  return new Promise((resolve, reject) => {
    try {
      console.log("uploadBlob blob", blob);
      // const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: bucketName,
        Body: blob,
        Key: key,
      };
      // console.log(uploadParams);
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("[S3/.js] uploadFile ERROR", err);
          reject(false);
        }
        if (data) {
          // console.log("Upload Success", data.Location);
          return resolve(data);
        }
      });
    } catch (err) {
      console.log("[S3/.js] uploadFile ERROR", err);
      reject(false);
    }
    // return s3.upload(uploadParams).promise();
  });
}

// downloads a file from s3
function getFileStream(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    console.log("[S3/.js] downloadParams ", downloadParams);

    return s3.getObject(downloadParams).createReadStream();
  } catch (err) {
    console.log("[S3/.js] err", err);
    return null;
  }
}

module.exports = {
  uploadFile,
  uploadBlob,
  getFileStream,
};
