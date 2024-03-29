import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./post";
import { getSpaces } from "./get";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, ddbClient);
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, ddbClient);
        return postResponse;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const res: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return res;
}

export { handler };
