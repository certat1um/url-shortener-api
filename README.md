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

> After successful launch of the project you can connect to redis in console to view cached data. For this type this command in your terminal:

```bash
$  REDISCLI_AUTH=GOQ6fKaGn4qUR9WFAlKabVgGGq86sUHL redis-cli --user red-cr5ra1lumphs73e7kh7g -h oregon-redis.render.com -p 6379 --tls
```

> Command to view all keys

```bash
$  KEYS *
```

> Command to view a specific key value

```bash
$  GET <KEY>
```

## Run tests

```bash
$ npm run test
```

## Swagger API Documentation

> Route: `http://localhost:3000/swagger`
