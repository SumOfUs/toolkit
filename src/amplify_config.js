import Amplify from 'aws-amplify';

export default Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:d971a7bb-3f58-4aff-9bb9-d13c9ad089a5', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_dFic90M1t', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '9ilre0g9agfcvtaeb1du82ag5', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        bucket: 'sumofus.org.quiz', //REQUIRED -  Amazon S3 bucket
        region: 'us-east-1', //OPTIONAL -  Amazon service region
        identityPoolId: 'us-east-1:d971a7bb-3f58-4aff-9bb9-d13c9ad089a5'
    }
  }
);
