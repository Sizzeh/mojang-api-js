"use strict";

const c = require('centra');
const base = 'https://api.mojang.com/';
const baseStatus = 'https://status.mojang.com/'
const sessionserver = 'https://sessionserver.mojang.com/'

/**
* Main Client class.
*/
class Client {

    /**
	* Returns status of various Mojang services.
	*/
    async getStatus() {
        const res = await c(baseStatus + 'check').send()
        const json = await res.json();

        if (json) {
			return json;
		} else throw new Error(res.statusCode);
    }

	/**
	* Get a uuid from a username.
	* @param {string} username - Username for the target.
	*/
    async nameToUuid(username) {
        const res = await c(base).path(`users/profiles/minecraft/${username}`).send()
    
        const json = await res.json();
        if (json) {
            if (json.id) {
                return json;
            } else {
                throw new Error((json.error + ' path:'+json.path) || json.errorMessage || json)
            }
        } else {
            throw new Error(`${res.statusCode} status code`);
        }
    }

    /**
	* Get a username from a uuid.
	* @param {string} uuid - uuid for the target.
	*/
    async uuidToName(uuid) {
        const res = await c(base).path(`user/profile/${uuid}`).send()
    
        const json = await res.json();
        
        if (json) {
            if (json.name) {
                return json;
            } else {
                throw new Error((json.error + ' path:'+json.path) || json.errorMessage || json)
            }
        } else {
            throw new Error(`${res.statusCode} status code`);
        }
    }

    /**
	* Get name history from uuid or username.
	* @param {string} target - UUID or username for the target.
	*/
    async nameHistory(target) {
        const uuid = await this.returnUUIDfromAny(target);

        const res = await c(base).path(`user/profiles/${uuid}/names`).send()

        const json = await res.json();

        if (json) {
			return json;
		} else throw new Error(res.statusCode);
    }

    /**
	* Get player textures for a target using username or uuid.
	* @param {string} target - UUID or username for the target.
	*/
    async playerTextures(target) {
        const uuid = await returnUUIDfromAny(target);

        const res = await c(sessionserver).path(`session/minecraft/profile/${uuid}`).query({
            'unsigned': true
        }).send()

        const json = await res.json();


        if (json) {
            if (json.name) {
                return (new Textures(json)).object;
            } else {
                console.log(json)
                throw new Error((json.error + ' path:'+json.path) || json.errorMessage || json)
            }
        } else {
            throw new Error(`${res.statusCode} status code`);
        }
    }
}

class Textures {
    constructor(texturesObject) {
        this.object = {
            id: texturesObject.id,
            name: texturesObject.name,
            properties: this.createProperties(texturesObject.properties)
        }
    }

    createProperties(properties) {
        let arr = [];
        for (let prop of properties) {
            arr.push(JSON.parse(Buffer.from(prop.value, 'base64').toString('ascii')));
        }
        return arr;
    }
}

async function returnUUIDfromAny(testCase) {
    try {
        return (await new Client().nameToUuid(testCase)).id;
    } catch (err) {
        return testCase
    }
}

module.exports = Client