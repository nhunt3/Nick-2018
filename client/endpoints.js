const urlBase = 'http://localhost:8080/api/';

const createUser = function(username, password) {
    const url = `${urlBase}createUser`;
    const data = {username, password};
    postData(url, data);
};

const storePublicKey = function(username, password, publicKey) {
    const url = `${urlBase}storePublicKey`;
    const data = {username, password, publicKey};
    postData(url, data);
};

const verify = function() {
    const url = `${urlBase}verify`;
    getData(url);
};

const sign = function(username, password, privateKey) {
    const url = `${urlBase}sign`;
    const data = {username, password, privateKey};
    postData(url, data);
};