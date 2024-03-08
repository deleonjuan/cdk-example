import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./post";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context){
    
    let message: string;

    switch (event.httpMethod) {
        case 'GET':
            message = 'Hello from GET!'
            break;
        case 'POST':
            const response = postSpaces(event, ddbClient);
            return response;
        default:
            break;
    }
    
    const res: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return res
}

export {handler}