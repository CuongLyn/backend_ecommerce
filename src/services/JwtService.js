const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = (payload) => {
    
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {
        expiresIn: '30s'
    });
    return access_token;
}

const generalRefreshToken = (payload) => {
   
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {
        expiresIn: '365d'
    });
    return refresh_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise( async (resolve, reject) => {
        try{
            console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) =>{
                if(err){
                    resolve({
                        status:'ERROR',
                        message: 'The authentication'
                    })
                }
                const { payload } = user
                const access_token = generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                console.log('access_token', access_token)
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                })
    
            })
        } catch(e){
            reject(e)
        }
    })
}
module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}