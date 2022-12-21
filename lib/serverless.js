import getWishList from "@functions/getWishList";
import deleteWishList from "@functions/deleteWishList";
import createWishList from "@functions/createWishList";
import updateWishList from "@functions/updateWishList";
import searchWishList from "@functions/searchWishList";
const serverlessConfiguration = {
    service: "DARE-WISHLIST-LEARNING-STACK",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild"],
    provider: {
        region: "eu-central-1",
        stage: "${opt:stage}",
        name: "aws",
        runtime: "nodejs14.x",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:DescribeTable",
                            "dynamodb:Query",
                            "dynamodb:Scan",
                            "dynamodb:GetItem",
                            "dynamodb:PutItem",
                            "dynamodb:UpdateItem",
                            "dynamodb:DeleteItem",
                        ],
                        Resource: "arn:aws:dynamodb:eu-central-1:*:table/WishlistTable",
                    },
                ],
            },
        },
    },
    functions: {
        getWishList,
        deleteWishList,
        createWishList,
        updateWishList,
        searchWishList,
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
    },
    resources: {
        Resources: {
            WishListTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "WishlistTable",
                    AttributeDefinitions: [
                        {
                            AttributeName: "ID",
                            AttributeType: "S",
                        },
                        {
                            AttributeName: "SITE",
                            AttributeType: "S",
                        },
                        {
                            AttributeName: "NAME",
                            AttributeType: "S",
                        },
                        {
                            AttributeName: "PRICE",
                            AttributeType: "N",
                        },
                    ],
                    KeySchema: [
                        {
                            AttributeName: "ID",
                            KeyType: "HASH",
                        },
                    ],
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: "NAME_INDEX",
                            KeySchema: [
                                {
                                    AttributeName: "NAME",
                                    KeyType: "HASH",
                                },
                            ],
                            Projection: {
                                ProjectionType: "ALL",
                            },
                        },
                        {
                            IndexName: "SITE_INDEX",
                            KeySchema: [
                                {
                                    AttributeName: "SITE",
                                    KeyType: "HASH",
                                },
                            ],
                            Projection: {
                                ProjectionType: "ALL",
                            },
                        },
                        {
                            IndexName: "PRICE_INDEX",
                            KeySchema: [
                                {
                                    AttributeName: "PRICE",
                                    KeyType: "HASH",
                                },
                            ],
                            Projection: {
                                ProjectionType: "KEYS_ONLY",
                            },
                        },
                    ],
                    BillingMode: "PAY_PER_REQUEST",
                },
            },
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map