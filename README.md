# ethereumjs
An app built using the MEAN stack to use and manage contracts and scripts on you own ethereum testnet.

## Install eth && geth

Follow the instructions on this tutorial to intall eth and geth (I reccomend to install both of them):
https://ethereum.org/cli

## Install solc

Follow the instrucitons on the sol compiler install here:
https://ethereum.org/greeter

## Create you testnet blockchain

Create a new folder where you testnet will be located with a genesis.json file with this content:
```
{
	"nonce": "0xdeadbeefdeadbeef",
	"timestamp": "0x0",
	"parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"extraData": "0x0",
	"gasLimit": "0x8000000",
	"difficulty": "0x400",
	"mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"coinbase": "0x3333333333333333333333333333333333333333",
	"alloc": {
	}
}
```

## Create your new account && start mining

Go to the app directory and edit the console-testnet.sh to match your testnet directory and run it.

`geth --genesis [YOU TESTNET DIRECTORY]/genesis.json  --datadir[YOU TESTNET DIRECTORY] --rpc --rpcaddr="0.0.0.0" --verbosity=2 --maxpeers=0 --rpccorsdomain="http://localhost:3000" console`

Once you are in we need to create a new account and select our password:

Run `personal.newAccount()` and put your new password.

Create a file called password-testnet and put you passoword there.

Now we have our account with teh password on a file we can start mining our testnet, change the directory on the mine-testnet.sh and run it.

`geth --genesis [YOU TESTNET DIRECTORY]/genesis.json --datadir [YOU TESTNET DIRECTORY] --rpc --rpcaddr="0.0.0.0" --verbosity=5 --maxpeers=0 --rpccorsdomain="http://localhost:3000" --nodiscover --unlock=0 --password="password-testnet" --mine`

Now that we are mining we can run our app.

## Run the app

Once you are mining you can start another console and go to the app directory, if you are going to develop and make changes on the app run it using the -dev argument for better debug on the client files.

`node index.js -dev` or `node index.js`
