import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./post";
import { getSpaces } from "./get";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context){
    
    let message: string;

    switch (event.httpMethod) {
        case 'GET':
            const getResponse = await getSpaces(event, ddbClient);
            return getResponse;
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