import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import config from '../../config';
import { User } from '../../database/entities/User';
import { ranks } from '../../lib/routes';
import { comparePassword } from '../../lib/security';
import { RequestPayload, Route } from '../../types';

const Routes : Route[] = [
    {
        path: '/auth/me',
        method: 'get',
        secure: true,
        permission : 'wildcard',
        handler: async (req: Request, res: Response) => {      
            var user = await getRepository(User).findOne ({ where : {id : (req.payload as RequestPayload).userId}})
            if(user){
                res.status(200).send(
                    {
                        user: user,
                        permissions: ranks.get(user.rank).securityPermissions.map(a => a.name)
                    }
                )
            }else{
                res.status(404).send({ error: 'User not found' });
            }
        }
    },
    {
        path: '/auth/login',
        method: 'post',
        secure: false,
        permission : 'wildcard',
        handler: async (req: Request, res: Response) => {
            const { email, username, password } = req.body;

            var user;

            if(email){
                user = await getRepository(User).findOne(
                    {
                        email: email,                    
                    }
                )
            }else if(username){
                user = getRepository(User).findOne(
                    {
                        username: username,                    
                    }
                )
            }
            
            if(user){
                if(await comparePassword(user.password, password)){
                    let expiresIn = 129600;

                    let token = jwt.sign(
                        {
                            userId: user.id,
                            rank: user.rank
                        },
                        config.JWT_SECRET,
                        { expiresIn: expiresIn }
                    );
+
                    res.status(200).send({
                        user: user,
                        token: token,
                        expiresIn: expiresIn,
                        permissions: ranks.get(user.rank).securityPermissions.map(a => a.name)
                    });
                }else{
                    res.status(500).send({ error: 'Wrong password' });
                }
            }else{
                res.status(500).send({ error: 'Wrong password' });
            }
        }
    },

];

export default Routes;

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}