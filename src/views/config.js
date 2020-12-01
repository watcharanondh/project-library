const config = {
    development: {
        apiUrl: 'https://dev.chalui.net/lbn',
        dbHost: "10.123.41.22",
        dbUsername: "1111",
        dbPassword: "123456"
    },
    production:{
        apiUrl: 'https://dev.chalui.net/lbnp',
        dbHost: "10.123.41.11",
        dbUsername: "1111",
        dbPassword: "123412eqweqwfdqwdqwfqw56"
    },
}

const nodeEnv = process.env.VUE_APP_ANOTHER_VARIABLE
module.exports = config[nodeEnv]