/* eslint-disable @typescript-eslint/func-call-spacing */
/* eslint-disable no-unexpected-multiline */

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import {
  validateOrReject,
  Length,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsString,
  IsAlpha,
  IsAlphanumeric,
} from 'class-validator';

class User {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Length(3, 15)
    username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @IsAlphanumeric()
    password!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
    email!: string;
}

interface IQuerystring {
  validate: string;
}

interface IBody {
  username: string;
  password: string;
  email: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export = async function (fastify: FastifyInstance, options: any) {
  fastify.get('/class-validator', (req: FastifyRequest, reply: FastifyReply) => {
    reply.view('class-validator', options);
  });

  fastify.post
  <{ Querystring: IQuerystring, Body: IBody }>
  ('/class-validator', async (req, reply) => {
    const { username, password, email } = req.body;
    const user = new User();

    user.username = username;
    user.password = password;
    user.email = email;

    if (req.query.validate == 'false') {
      return `User ${user.username} hasn't been validated`;
    }

    try {
      await validateOrReject(user);
      return `Valid user: ${user.username}`;
    } catch (err) {
      return `Invalid user: ${user.username} \n ${err}`;
    }
  });
};
