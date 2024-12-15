module.exports = {
  "swagger": "2.0",
  "securityDefinitions": {
    "JWT": {
      "type": "apiKey",
      "in": "header",
      "name": "auth-token"
    }
  },
  "info": {
    "version": "1.0.0",
    "title": "Mates - CS300",
    "description": "A REST API made with Express and Postgres for CS300 project.",
    "license": {
      "name": "Licensed under MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
}