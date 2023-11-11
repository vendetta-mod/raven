# raven

Friendly bot for the [Vendetta Discord server](//discord.gg/n9QQ4XhhJP).

## Self-hosting

### Prerequisites

* [Git](//git-scm.com/)
* [node.js & npm](//nodejs.org)
* [pnpm](//pnpm.io)*

### Instructions

1. Clone the repository:
```
git clone https://github.com/vendetta-mod/raven
```

 - or, if you're using Git over SSH:
```
git clone git@github.com:vendetta-mod/raven
```

2. Install dependencies:
```
pnpm i # or equivalent for your package manager of choice
```

3. Create a new file called `config.json`, and fill in the fields.

4. Then, build the bot with:
```
pnpm build
```

5. Once it is built (it should exit with no output), run it with:
```
pnpm start
```

Congratulations, you are now running raven locally!

## Local development

1. Follow step 1, 2 and 3 of the selfhosting instructions.

2. Then, run:
```
pnpm dev
```

This automatically restarts the bot when a file is changed.

<div><sub>*raven uses pnpm as it's package manager!</sub></div>
