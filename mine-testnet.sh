geth --genesis ~/.eth-test/genesis.json --datadir ~/.eth-test --rpc --rpcaddr="0.0.0.0" --verbosity=5 --maxpeers=0 --rpccorsdomain="http://localhost:3000" --nodiscover --unlock=0 --password="password-testnet" --mine