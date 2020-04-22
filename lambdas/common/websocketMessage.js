const AWS = require('aws-sdk');

const create = (domainName, stage) => {
    const endPoint = `${domainName}/${stage}`;

    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endPoint,
    });
}

const send = ({domainName, stage, connectionID, message}) => {
    const ws = create(domainName, stage);

    const postParams = {
        Data: message,
        connectionId: connectionID,
    };

    return ws.postToConnection(postParams).promise();
}

module.exports = {
    send,
};