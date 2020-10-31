# Starter with Typescript on Node using Express with debugging enabled using Visual Studio Code

# Getting Started

Pre-requisite installs (presuming you already installed these on your machine):

* Node https://nodejs.org
* Visual Studio Code https://code.visualstudio.com
* Git https://git-scm.com/

Execute these terminal commands:

```
git clone https://github.com/solodynamite/node-express-typescript-vscode-debugging-starter ./*your-new-project-name
cd *your-new-project-name
npm i
code .
```

If command `code .` from Terminal doesn't launch Visual Studio Code on your Mac, follow instructions from https://code.visualstudio.com/docs/setup/mac to configure it.


**To auto-transpile your code every time you save your work**

The recommended way is to open Terminal outside Visual Studio Code (preferably Powershell in Windows) and execute:

```
npm i -g typescript // just run this one once - a one-time global install of typescript in your machine
tsc -w
```

Keep this terminal open and running while you're coding.

Alternatively, in Visual Studio Code, press ⇧⌘B in MacOS or Ctrl+Shift+B in Windows then select `tsc: watch - tsconfig.json`.

Your auto-transpiling progress will appear in Visual Studio Code's Terminal window instead.

**That's it.  Your new project is ready for coding..**


**To launch Express under Debug mode**

In Visual Studio Code, press `F5` - debugging comes complete with breakpointing, Watch, Call stack etc.

Open Debug Console (the tab alongside Terminal) and wait until it prints 'Server running at port 3000'.

Then go to http://localhost:3000 in your browser.  It should display a simple message, 'Hello world!'


# Note

The entry point of your build is at `/server.ts` that gets transpiled to and executed from `/dist/server.js`.

Your coding work should always be written in the .ts files outside the `/dist` folder.

The transpiled (.js) files end up at the `/dist` folder.  The ts compiler (tsc) will overwrite the corresponding js files in there.  So best not to write any code on them.

# To recreate this starter from scratch

Run these command at the Terminal

```
npm install express --save
npm install typescript @types/node @types/express --save-dev
npx tsc --init
```

Enable the following settings in tsconfig.json
```
"sourceMap": true,
"outDir": "dist"
```

Update the following in package.json
```
"scripts": {
    "start": "node 'dist/server.js'"
},
```

Add a new file `launch.json` inside a new folder, `/.vscode` with the following content:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Server",
      "program": "${workspaceFolder}/server.ts",
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "pwa-node"
    }
  ]
}
```

Add .gitignore file with the following content:
```
node_modules
**/*.map
dist
```
