## Setup and use

### Install

```sh
npm install
```

### Development

```sh
npm run dev
```

## Tech stack

- next.js
- react
- chakra-ui

## Code style

- Use eslint and prettier to lint and format the source code.

- Use commitlint to check and format the commit message.

> Setup the settings for vscode which format the file on save.

> When `git commit`, use husky and lint-staged to check the type, lint and format the source code, and also check the format for git commit message

### recommend vscode extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

### Git commit message conventions

ref: [here](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

## Road map

- [x] ESLint
- [x] Prettier
- [x] Commitlint
- [ ] Dockerize
- [ ] github-actions
