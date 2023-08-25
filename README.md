# Starter with Typescript on Node using Express and Nodemon with debugging enabled using Visual Studio Code

## Getting Started

Pre-requisite installs (presuming you already installed these on your machine):

* Node https://nodejs.org/en/donwload
* Visual Studio Code https://code.visualstudio.com
* Git https://git-scm.com/

With Node installed, install Typescript globally to your machine via Terminal with this command:
```NPM Config
npm i -g typescript
```

## To recreate this starter from scratch...

Run these commands at the Terminal in the target directory
```NPM Config
npm init -y
npm install express
npm install --save-dev typescript nodemon ts-node @types/node @types/express
tsc --init
```

Enable/add the following settings in `tsconfig.json`
```JSON
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

Update the following in `package.json`
```JSON
{
  "scripts": {
      "start": "node 'dist/server.js'",
      "debug": "nodemon --inspect src/server.ts"
  },
}
```

Add a new file `/nodemon.js` at the root folder with the following content:
```JSON
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": true,
  "execMap": {
    "ts": "node --require ts-node/register"
  },
  "watch": ["src/"],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json,ts"
}
```

Add a new file `/.vscode/launch.json` with the following content:
```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "Debug",
      "program": "${workspaceFolder}/src/server.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "request": "launch",
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Debug with Nodemon",
      "processId": "${command:PickProcess}",
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```

Add `.gitignore` file with the following content:
```Ignore List
node_modules
**/*.map
dist
```

Add a new file, `/src/server.ts` with this block of code:
```javascript
import express from 'express'
import { HelloService } from './services/HelloService'

const port = 3000

express()

    .get('/', (request, response) => {

        const result = new HelloService().sayHello('world')

        response.send(result)
    })
    .listen(port, () => {
 
        console.log(`Server running at port ${port}`)
    })
```

Add also a new file, `/src/services/HelloService.ts` with this block of code:
```javascript
export class HelloService {

    sayHello(firstName: string) {

        return `Hello ${firstName}!`
    }
}
```

## ...Or to start using the source code here

Execute these terminal commands:

```shell
git clone https://github.com/solodynamite/node-express-typescript-vscode-debugging-starter ./*your-new-project-name
cd *your-new-project-name
npm i
code .
```

If command `code .` from Terminal doesn't launch Visual Studio Code on your Mac, follow instructions from https://code.visualstudio.com/docs/setup/mac to configure it.

**That's it.  Your new project is ready.**

## To launch the app under Debug mode without Nodemon

In Visual Studio Code, change the Debugger to 'Debug':

![alt text](https://raw.githubusercontent.com/solodynamite/node-express-typescript-vscode-debugging-starter/main/.public/Screenshot%202023-08-24%20141344.png)

Press `F5` - debugging comes complete with breakpointing, Watch, Call stack etc.

Open Debug Console (the tab alongside Terminal) and wait until it prints 'Server running at port 3000'.

Then go to http://localhost:3000 in your browser, Postman or similar.  It should display a simple message, 'Hello world!'

Breakpoints should now work in your code.

## To launch the app with Nodemon

In the Terminal in Visual Studio Code, execute ``` npm run debug ```.  This will launch Nodemon, saying 'Server running at port 3000'.

Change the Debugger to 'Debug with Nodemon' then press `F5`.

Select option that mentions 'src/server.ts':

![alt text](https://github.com/solodynamite/node-express-typescript-vscode-debugging-starter/blob/main/.public/Screenshot%202023-08-24%20142748.png?raw=true)

The Terminal should now say, 'Debugger attached'.

Then go to http://localhost:3000 in your browser, Postman or similar.  It should display a simple message, 'Hello world!'

Save any changes to your JS code while this debugging state is running.  

The Terminal should confirm Nodemon and debugger has restarted automatically.  

Breakpoints in your code should still work andr changes should now reflect at the next call, also.

# FYI

The entry point of your build is at `/src/server.ts` that gets transpiled to and executed from `/dist/server.js`.

Your coding work should always be written in the .ts files outside the `/dist` folder.

The transpiled (.js) files end up at the `/dist` folder.  The ts compiler will overwrite the corresponding js files in there.  So best not to write any code on them.

