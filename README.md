# Init Coding Challenge Front-end

This is a front-end repository for the Init Coding Challenge.

## Structure

Project was built using Turborepo, a monorepo tool that allows us to have multiple packages in the same repository. There are two apps:

- `web` - main app, where the user will interact with the application
- `admin` - admin app, where the admins will manage the application

And one shared package:

- `ui` - shared components between the two apps

## Setup

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

## Running the project

You can run the project using the following command (it will start both apps):

```bash
pnpm dev
```

By default, it will start the website on `http://localhost:3000` and the admin panel on `http://localhost:3001`.

To run only one app, you can use the following command:

```bash
pnpm dev:<app-name>
```

Where `<app-name>` is either `web` or `admin`.

Other useful commands:

- `pnpm build` - builds all packages
- `pnpm lint` - runs eslint on all packages
- `pnpm type-check` - runs typescript type-check on all packages
- `pnpm clean` - removes cached builds and other temporary files
- `pnpm format` - formats all files using prettier
