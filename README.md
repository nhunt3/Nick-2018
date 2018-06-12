Node Authentication App

In terminal, cd to directory where you want to store this project
Run git clone /////Nick-2018.git
Run npm install
Run run node server.js

Navigate to http://localhost:8080 in your browser
Open the developer tools and go to the console tab.

Run createUser(username, pass)
Example: createUser('Fred FlintStone', 'Wilma')

Run storePublicKey(username, pass, publicKey)
Example: storePublicKey('Fred FlintStone', 'Wilma', `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnbMAefrXk4aJlQnKEWbg8/fwM
PLRmhrXdrQf/bMvQciqGlljBJKgdOmjuaCFy70AD/wuNbcTNaoqFHYNchEs5jOCG
pwKldfNxNNvW2ZjYgkIR7w+cKJ5j+UHm9jBggVz6vDMmNoCdbh+NYM7QJEjmK3SG
XnI4r2dHwEFU1wgw2wIDAQAB
-----END PUBLIC KEY-----`)

Run verify() (which will fail, since we haven't signed it yet)

Run sign(username, pass, privateKey)
Example: sign('Fred FlintStone', 'Wilma', `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCnbMAefrXk4aJlQnKEWbg8/fwMPLRmhrXdrQf/bMvQciqGlljB
JKgdOmjuaCFy70AD/wuNbcTNaoqFHYNchEs5jOCGpwKldfNxNNvW2ZjYgkIR7w+c
KJ5j+UHm9jBggVz6vDMmNoCdbh+NYM7QJEjmK3SGXnI4r2dHwEFU1wgw2wIDAQAB
AoGAKQPcQNw7xTl9Zh8UHNY56z8xWvIYI7HGpeq4tds6RvNg9Z2pWo+XW6mugREj
eJuh7Bi0BM6qUsRR8PBc+PIz1xwjmRg0P36w3KvXTxjDgk+KIsaebR+sRQK6S3ni
+lQleV7ZUShJIOOW4WLAi7wnQkymARy0m4v0hGc1xPY+rIECQQDrf+MTxQLmAR0y
sfgCS0CmoaykeaBDTaRff86vz4I+Z8oN1e2SgIbDkY9gVI1a2M4xFj7I7ZTqWK+I
+DLJ3E6bAkEAtf/Q6RWNuRBEd3To1maHwKPh9Goz3J54Z8f1m3BQz096wd6+cWrr
I+7gJHN14Uq+KQTg9yes3ZBRpZuRIBqqwQJALZmbzK4vO34nuzM+xKLxp9JSbZ6n
a6DTHTLQQLa7j33lX/x2fhGpBqFe09ZLcLXeZx7ZlWp7lU0K4Ei+/NtN1QJAEtss
Q9nt0wyya0X7kasRyY2xLWeLdAIfK3F2KuKaHMB5UXjIdmvDbPek1WH5Bpx90zYk
MLc1m8cGDohtosvggQJBAMkl/IQ4XT554sJiSASGtD8x0uX7dQXYALWdzQP17CKz
/cF94ZIG26O4ekJQVBL0F/ros1uDGdnrTuk6wtScN9c=
-----END RSA PRIVATE KEY-----`)

Run verify() again (which will succeed this time, since we just signed it)