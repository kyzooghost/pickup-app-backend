# Student Pickup App Backend

Built using Serverless framework to manage AWS DynamoDB, Lambda and API Gateway services.

Frontend deployed at https://pickup-app-frontend.vercel.app/


## Requirements

- [Serverless CLI](https://www.serverless.com/framework/docs/getting-started/)
- [AWS CLI with valid credentials](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)


## Environment variables

See `.env.example` for required environment variables in `.env`


## Commands

Deploy AWS services  - `serverless deploy`


Delete AWS deployment - `serverless remove`


View API routes - `serverless info`


Run tests - `npm run test`


## Directory Structure

```text
/src - Source code
  /constants - Constants
  /functions - AWS Lambda functions
  /utils - Utility functions
/test - Test files
```