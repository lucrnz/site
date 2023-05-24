## crypt-link

This is a tool I made to crypt a link local side using JavaScript.

Mainly to avoid spammers.

## Getting started

Install the packages

```sh
pnpm i
```

You need a `.env` file and you have to setup there the crypt key.

```sh
cp .env.example .env
```

Edit its contents to setup a key.

```sh
code .env
```

Copy the example JSON file.

```sh
cp input.example.json input.json
```

Edit it!

Run

```
node index.js
```

This will generate the crypted links on `output.json`
