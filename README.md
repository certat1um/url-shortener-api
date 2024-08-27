# URL Shortener API

## Project setup

> Install npm packages

```bash
$ npm install
```

> After that create **.env** file with data copied from **.env.example**

## Compile and run the project

```bash
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

## Redis

> After a successful launch of the project you can connect to redis in console to view cached data. For this, type this command in your terminal:

```bash
$  REDISCLI_AUTH=GOQ6fKaGn4qUR9WFAlKabVgGGq86sUHL redis-cli --user red-cr5ra1lumphs73e7kh7g -h oregon-redis.render.com -p 6379 --tls
```

> Command to view all keys:

```bash
$  KEYS *
```

> Command to view a specific key value:

```bash
$  GET <KEY_NAME>
```

## Run tests

```bash
$ npm run test
```

## Postman / Insomnia

> You can import environment for your API testing app from `/postman` directory

## Swagger API Documentation

> Swagger Documentation route:
>
> Local example: `http://localhost:3000/swagger`

## Render Deploy

> Project also deployed on **Render.com**. (requests can be delayed by 50 seconds or more in due to free plan of using Render service)
>
> Base route: `https://url-shortener-api-hdwm.onrender.com`
