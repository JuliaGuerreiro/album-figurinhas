const makePostRequest = async (address, body) => {
    return fetch(`${proxy}${address}`, 
        {
        "method": 'POST',
        "headers": {
                'Content-Type': 'application/json'
        },
        "body": JSON.stringify(body)
    })
}