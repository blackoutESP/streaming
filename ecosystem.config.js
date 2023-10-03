module.exports = {
    apps : [{
        name   : "small streaming service",
        script : "./src/index.ts",
        instances: 2,
        watch: true,
        max_memory_restart: '100MB',
        log_date_format: 'YYYY-MM-DD',
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}