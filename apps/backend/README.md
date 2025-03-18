# ICC Backend

This is the repository for the Init Coding Challenge backend.

## Environment variables

In the root of a project there is an [`.env.example`](.env.example) file that contains all the environment variables that are used in the project. You can copy this file and rename it to `.env.development.local` and fill in the values. If you wish to use different naming convension, make sure to change it in [app.module.ts](src/app.module.ts) file.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
