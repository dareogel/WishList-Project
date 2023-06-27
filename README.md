### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### LOCAL TESTING

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

## PROJECT

This is the serverless endpoints for a test wishlist application.

This project creates the CREATE, GET, DELETE and PATCH endpoint for the project.a

## Endpoints

/wishlist

GET - Get all the wish lists items
POST - Will create a wish list item
DELETE - Will delete all wish list items

/wishlist/{id}

GET - get wishlist by id
PATCH - update a wishlist item by id
DELETE - delete a wishlist item by id

/wishlist/search

GET - takes in a search term and searches the data with this

## Functions

### GetWishlistfunction

Input: `{id?:string}`
Return: `{id: string, site: string, name: string, price: float, url: string}[]`
This endpoint will retreive all wishlist items, If an id is passed in it will only return the detials for that one

### DeleteWishlistfunction

Input: `{id?:string}`
Return: `{id: string}[]`

This endpoint will delete all wishlist items, If an id is passed in it will only delete the detials for that one

### CreateWishlistfunction

Input: `{site: string, name: string, price: float, url: string}`
Return: `{id: string, site: string, name: string, price: float, url: string}`

This endpoint will create a wishlist items based on the date passed to it

### UpdateWishlistfunction

Input: `{id:string, site?: string, name?: string, price?: float, url?: string} `
Return: `{id: string, site: string, name: string, price: float, url: string}`

This endpoint will update a wishlist item from the id and parameters passed in.

### SearchWishlistfunction

Input: `{price?:float, site?: string, name?: string} `
Return: `{id: string, site: string, name: string, price: float, url: string}[]`
This will search for an item based on the data that is passed in.

## Database

We will be using a Dynamo DB database for storing our data, see below for the schema

search by, price, site and name

The main index for the table is the unique ID. We also have the following unique index's

Index's
NameIndex
SiteIndex
PriceIndex

| ID     | SITE   | NAME   | PRICE | URL    |
| ------ | ------ | ------ | ----- | ------ |
| STRING | STRING | STRING | FLOAT | STRING |
|        |        |        |       |        |
|        |        |        |       |        |

## HOMEWORK FOR 28/03/2023

Started by looking at the homework, found that the reformat of how we reformatted the endpoints has killed alot of the int test, looked through what we had to change.
Started discussing dynmoDb and its concepts and looking into tits syntax

Discussed plans to implement graphQL server to our project >> decided to utilise the string format which is the same as LEGOs implementation

Homework: Add in unhappy paths to the unit tests. Finnished refactoring any of the int tests that need to be.

## HOMEWORK FOR 14/03/2023

Session details: Started by fixing issues with jest and typescript. Tests where a pain to get started. We then worked on unit tests and mocking explaioning how it workes and how to use it.

Homework: Create unit tests for anything left.

## HOMEWORK FOR 15/02/2023

Session details: We refactored the dynamo db database to not have the name or url resticted prop values. we then delt and looked into issues with the refactored code.
We then moved onto looking at unit testing and starting to write some of the unit tests. But ran into issues, will be picked up next week.

## HOMEWORK FOR 18/01/2023

Session details: We looked over the last sessions homework and discussed this. We went into what to do when a stack fails to delete. We then proceeded to start work on the update endpoint.

Your homework will be to create the new endpoints integration tests for everything except for name because of the issue we will resolve next time!

NAME is reserved DynamoDB
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html

## HOMEWORK FOR 21/12/2022

Additianal things discussed: destructuring, Debuggind failed deployements in serverless

Complete getWishList and add in the failure point intergration tests for getWishList.

If you want to challenge youself! You have now create 2 endpoints and their integration tests. You now know all the basics of creating an endpoint and interacting with dynamoDb. This challenge is to create the delete endpoint for our wishlist items. So that it takes in an Id and will then delete the item from our database if it exists! When you have done this also have a go at writing the integration tests! Clue: This endpoint should be nearly exactly the same as the getWishListItem endpoint.

with original createWishList endpoint use deleteEndpoint to clean up the tests afterwards

## PREVIOUS: HOMEWORK FOR 23/11/2022

VV Helped with this in the session
Push the work we have done so far upto your personal github account.

Google how to add jest to a typescript project. And add it to this project

VV completed in next sessions as got a little stuck :)
For both the Create and Get endpoints create integration tests to make sure that they are both working (You can use each of the endpoints to be able to check that the other is working as expected.)

## PREVIOUS: HOMEWORK 09/11/2022

Add postman endpoint for Delete wishlist

Add postman endpoint for Update wishlist

Add postman endpoint for search wishlist

Within the create wish list handler, Look at the event that is being passed in and grab the wishlist items detials of the body.

Extra: Have a crack at creating a UUID. try and make a completely unique id that cannot ever be the same.

From that pass those values into the dynamo call to add that to the dynamo table.

Then return a sucess message from the endpoint.

Put a try catch around the dynamo request, if there are any errors return an appropreate error message.
