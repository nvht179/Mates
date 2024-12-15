module.exports =
{
  schemas: {
    "login": {
      "properties": {
        "email": {
          "type": "string",
          "example": "lnkhoa22@apcs.fitus.edu.vn"
        },
        "password": {
          "type": "string",
          "example": "123"
        }
      }
    },
    "forgetPassword": {
      "properties": {
        "email": {
          "type": "string",
          "example": "lnkhoa22@apcs.fitus.edu.vn"
        },
        "newPassword": {
          "type": "string",
          "example": "321"
        },
        "newPassword2": {
          "type": "string",
          "example": "321"
        },
        "OTP": {
          "type": "string",
          "example": "123456"
        }
      }
    },
    "signUp": {
      "properties": {
        "role": {
          "type": "string",
          "example": "Student"
        },
        "password": {
          "type": "string",
          "example": "123"
        },
        "email": {
          "type": "string",
          "example": "lnkhoa22@apcs.fitus.edu.vn"
        },
        "name": {
          "type": "string",
          "example": "Luong Nguyen Khoa"
        },
        "username": {
          "type": "string",
          "example": "Koa"
        },
        "phone": {
          "type": "string",
          "example": "113"
        },
        "avatar": {
          "type": "string",
          "example": ""
        },
        "childEmail": {
          "type": "string",
          "example": ""
        }
      }
    }
  }
}