const postData = function(url, data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => console.log(response));
};

const getData = function(url, data) {
    fetch(url)
    .then(res => res.json())
    .then(response => console.log(response));
};