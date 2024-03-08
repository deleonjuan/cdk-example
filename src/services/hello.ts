import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context){
    
    let message: string;

    switch (event.httpMethod) {
        case 'GET':
            message = 'Hello from GET!'
            break;
        case 'POST':
            message = 'Hello from POST!'
            break;
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