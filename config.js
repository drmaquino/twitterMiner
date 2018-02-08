'use strict'

module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://drmaquino:u569g8nvMO!@maincluster-shard-00-00-gbnfu.mongodb.net:27017,maincluster-shard-00-01-gbnfu.mongodb.net:27017,maincluster-shard-00-02-gbnfu.mongodb.net:27017/twitterdb?ssl=true&replicaSet=MainCluster-shard-0&authSource=admin'
    },
    twitterAPI: {
        CONSUMER_KEY: "FarRAIgvRpc8kNv5n9gLcvTO4",
        CONSUMER_SECRET: "iwGrujzzqPGV1GbSpagVfUMNQ0BklY1tA3eQZDGPrBbHjVqbDV",
        ACCESS_TOKEN_KEY: "2752102411-ht5jkkirIo5piUV7ux7d5kKuKcekg3NwjcP9mMD",
        ACCESS_TOKEN_SECRET:"18N6DBBDJWEDLnoxwMGKhxTWF7VgQGrJuU5rvd1Da5PZ3",
        BEARER_TOKEN: "AAAAAAAAAAAAAAAAAAAAAGB04AAAAAAAa3DqNTrw8zFDSOmlRtvZFcPc5z8%3DUM0SR10QlmZvCzKKqFG4JDPdRsJSW7K5yw56VuRNGZoQbv7796"
    }
}
