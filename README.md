# Init Coding Challenge website

This is a repository for the Init Coding Challenge website.

## Structure

Project was built using Turborepo, a monorepo tool that allows us to have multiple packages in the same repository. There are three apps:

- `web` - main app, where the user will interact with the application (Next.js)
- `admin` - admin app, where the admins will manage the application (Next.js)
- `backend` - backend app, that will serve the data to the two apps (Nest.js). User management, authentication and authorization is handled by [init register service](https://github.com/INIT-SGGW/InIT-Azure-backend-01.Register).

And one shared packages:

- `ui` - shared ui components
- `types` - shared types between backend and frontend
- other shared configuration packages

## Building docker images

There is docker-compose file in the root of the repository that allows you to build project using docker. You can use the following command to build the images:

```bash
docker compose build
```

Or to build a specific image:

```bash
docker compose build <service-name>
```

Where `<service-name>` is either `web`, `admin` or `backend`.

### BUILD_ENV variable

BUILD_ENV variable, that you can set in the .env file (as shown in [.env.example](.env.example)), is used to set the **NEXT_PUBLIC_NODE_ENV variable** in Next.js apps and **image tags**.

This variable should be set to either `test` or `production`. If missing, it will default to `production`.

## Running locally

You can use following commands to setup the project (you need to have [pnpm](https://pnpm.io/installation#using-npm) installed):

Clone the repository:

```bash
git clone https://github.com/INIT-SGGW/ICC-frontend.git <project-name>
cd <project-name>
```

Then you can install the dependencies:

```bash
pnpm install
```

You can run the project using the following command (it will start all apps):

```bash
pnpm dev
```

By default, it will start the website on `http://localhost:3000`, admin panel on `http://localhost:3001` and backend on `http://localhost:4000`.

To run only one app, you can use the following command:

```bash
pnpm dev:<app-name>
```

Where `<app-name>` is either `web`, `admin` or `backend`.

Other useful commands:

- `pnpm build` - builds all packages
- `pnpm lint` - runs eslint on all packages
- `pnpm type-check` - runs typescript type-check on all packages
- `pnpm clean` - removes cached builds and other temporary files
- `pnpm format` - formats all files using prettier
