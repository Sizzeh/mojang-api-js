<p align="center" style="text-align: center;"><img src="https://raw.githubusercontent.com/Sizzeh/mojang-api-js/main/media/logo.png" width="200"/></p>

> A light Monjang Puplic API client for Node.js

[GitHub](https://github.com/Sizzeh/mojang-api-js) | [NPM](https://www.npmjs.com/package/mojang-api-js)

<img src="https://nodei.co/npm/mojang-api-js/">

## Install

```shell
npm i mojang-api-js
```

## Usage 

import the library and create the client

```js
const MojangAPI = require('mojang-api-js');
const client = new MojangAPI();
```

Get player data from username

```js
;(async () => {
    console.log(await client.nameToUuid('sizzeh')) // { name: 'Sizzeh', id: '3ec97906910744b5a5e12d7788aed017' }
})();
```

Get player data from uuid

```js
;(async () => {
    console.log(await client.uuidToName('3ec97906910744b5a5e12d7788aed017')) // { id: '3ec97906910744b5a5e12d7788aed017', name: 'Sizzeh' }
})();
```

get name history of a player using uuid or name

```js
;(async () => {
    console.log(await client.nameHistory('3ec97906910744b5a5e12d7788aed017'))
    console.log(await client.nameHistory('sizzeh'))
    /**
    * [
    *  { name: 'SizzyPvP' },
    *  { name: 'SizzyNF', changedToAt: 1566059031000 },
    *  { name: 'Sizzeh', changedToAt: 1574568684000 },
    *  { name: 'BUNNYGIRLSIZ', changedToAt: 1618557765000 },
    *  { name: 'Sizzeh', changedToAt: 1621180475000 }
    *  ]
    */
})();
```

get player texture example Skin and Cape from a username or uuid

```js
;(async () => {
    console.log(await client.playerTextures('3ec97906910744b5a5e12d7788aed017'))
    console.log(await client.playerTextures('sizzeh'))
    /**
    * {
    *     id: '3ec97906910744b5a5e12d7788aed017',
    *     name: 'Sizzeh',
    *     properties: [
    *         {
    *         timestamp: 1625627752125,
    *         profileId: '3ec97906910744b5a5e12d7788aed017',
    *         profileName: 'Sizzeh',
    *         textures: { SKIN: [Object] }
    *         }
    *     ]
    * }
    */
})();
```

Return status of various Mojang services.

```js
;(async () => {
    console.log(await client.getStatus());
    /**
    * [
    *  { 'minecraft.net': 'red' },
    *  { 'session.minecraft.net': 'green' },
    *  { 'account.mojang.com': 'green' },
    *  { 'authserver.mojang.com': 'green' },
    *  { 'sessionserver.mojang.com': 'red' },
    *  { 'api.mojang.com': 'green' },
    *  { 'textures.minecraft.net': 'green' },
    *  { 'mojang.com': 'red' }
    * ]
    */
})();
```