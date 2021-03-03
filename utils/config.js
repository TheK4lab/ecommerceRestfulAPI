module.exports = {
    PORT: process.env.PORT || 3000,
    connectionURL: "mongodb://kalab:Th3Ph3n0m@cluster0-shard-00-00.5ox4g.mongodb.net:27017,cluster0-shard-00-01.5ox4g.mongodb.net:27017,cluster0-shard-00-02.5ox4g.mongodb.net:27017/restfulAPIDB?ssl=true&replicaSet=atlas-5wi1ll-shard-0&authSource=admin&retryWrites=true&w=majority",
    jwtsecret: 'supersecret'
}