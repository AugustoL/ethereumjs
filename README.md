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
More info about the genesis creation here: http://adeduke.com/2015/08/how-to-create-a-private-ethereum-chain/

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

## Store contracts on mongodb

If you want to store all your contracts on your local mongodb you will need: Mongo running locally, a db with a user created, set up the dbURI on config.js and run the app with the -store arg. Here are the steps:

1. Install mongo, more info here: https://docs.mongodb.org/manual/installation/
2. Run your mongo console, if you type `mongo` it should work, if not use `mongo --host 127.0.0.1 --port 27017`.
3. Create a new db called ethereumjs with `use etehreumjs`.
4. Create a new user with `db.createUser( { user: "USERNAME", pwd: "PASSWORD", roles: [ "readWrite", "dbAdmin" ] } )`.
5. Add the dbURI to your config.js like `mongodb://USERNAME:PASSWORD@127.0.0.1:27017/ethereumjs`
6. Run the app with the -store arg and you will eb able to see the store section on the app.
