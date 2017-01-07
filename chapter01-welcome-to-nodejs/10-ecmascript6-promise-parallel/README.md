# 10-ecmascript6-promise-parallel
> Promise Transformation Chains for parallel processing

## Description
Illustrates how to use Promise Transformation Chains using `then` and `catch`.

In the example, a call to an HTTP endpoint is wrapped in a Promise. Then this promise is used to access http://api.github.com/users which returns a JSON object that is parsed, then a user is retrieved from that object and that user is used to call the GitHub api again and get some repo.

### Additional info
This pattern can be used when you need a waterfall approach.
