# Homeless
A collection of reuasble project agnostic typescript packages.

## Development
After cloning this repository run `npm install && npm run lerna-bootstrap` to install all dependencies

**Add dependencies**
To add a (--dev) dependency to all packages run:
```sh
$ lerna add <module-name>
```

To add dependencies to a specific package run:
```sh
$ lerna add <module-name> --scope=package
```
**Add package**
To add a new package create a new folder inside `/packages` and create a package.json using run:
```sh
$ yarn init
```
Make sure to name the module `@home-ht/<module-name>` so that it will be added to the home-ht npm scope
## Distribution
After making changes or adding a packages you can update the monorepo with:
```sh
$ npm run lerna-publish
```
this wil bump the version, create a tag + commit and publish all changed packages to npm.

## Usage
To install and use this monorepo's modules add them to your project using
```sh
$ yarn add @home-ht/<module-name>
```
and import the package like this:
```typescript
import { isValidPhonenumber } from '@home-ht/validator';
```
## Packages

**Validator**
```typescript
const isValidPhonenumber()
default Empty
```
