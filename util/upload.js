const aws = require("aws-sdk");
const { uuid} = require('uuidv4')
const {AWS_ACCESS_KEY,AWS_ACCESS_ID,BUCKET_NAME}=process.env;
aws.config.update({
  secretAccessKey: AWS_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_ID,
  region: "ap-south-1",
});

const S3 = new aws.S3();


const rawUpload = async(fileStream) => {
  const fileName=uuid()+'.mp3'
  const uploadParams = { Bucket:BUCKET_NAME , Key: "", Body: "",ACL:"public-read" };
  uploadParams.Body = fileStream;
  uploadParams.Key = fileName;
  const location =await (await S3.upload(uploadParams).promise()).Location;
  return location
};

module.exports = {S3,rawUpload };
