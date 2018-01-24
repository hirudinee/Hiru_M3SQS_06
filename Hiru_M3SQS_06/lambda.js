let AWS = require('aws-sdk');
const s3 = new AWS.S3();
let SL = require('@slappforge/slappforge-sdk');
const sqs = new SL.AWS.SQS(AWS);
exports.handler = function (event, context, callback) {

	sqs.sendMessage({
		MessageBody: 'test message',
		QueueUrl: 'https://sqs.us-east-1.amazonaws.com/480964559519/Hiru_SQS',
		DelaySeconds: '0',
		MessageAttributes: {
			"key001": {
				"DataType": "String",
				"StringValue": "001"
			},
			"key002": {
				"DataType": "String",
				"StringValue": "002"
			}
		}
	}, function (data) {
		// your logic (logging etc) to handle successful message delivery, should be here
	}, function (error) {
		// your logic (logging etc) to handle failures, should be here
	});
	s3.putObject({
		"Body": "test",
		"Bucket": "hiru.sample",
		"Key": "test"
	})
		.promise()
		.then(data => {
			console.log(data);           // successful response
			/*
			data = {
				ETag: "\\"6805f2cfc46c0f04559748bb039d69ae\\"", 
				VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
			}
			*/
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});



	callback(null, 'Successfully executed');
}