import { user } from "../config/user.js";
import jwt from "jsonwebtoken";

async function GenerateTokenSession(login, pass) {
    try {
        if (login === user.login && pass === user.password) {
            const jwtSecretKey = "gfg_jwt_secret_key" /* process.env.JWT_SECRET_KEY */;
            const data = {
                time: Date(),
                userId: 12,
            }

            const token = jwt.sign(data, jwtSecretKey);

            return {
                status: 200,
                data: {
                    token: token
                }
            }
        }
        return {
            status: 401,
            data: {
                message: "Unauthorized"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: {
                message: error
            }
        }
    }
}

function ValidateSession(token) {
    try {
        if (!token) {
            return false
        }
        if(jwt.verify(token, process.env.JWT_SECRET_KEY)){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}


export { GenerateTokenSession, ValidateSession }
