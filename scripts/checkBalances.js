module.exports = function(web3,db) {
	// Get the balance of all your eth accounts
	console.log('Your balances:');
	var i =0; 
	web3.eth.accounts.forEach( function(e){
	    console.log("web3.eth.accounts["+i+"]: " +  e + " --> " + web3.fromWei(web3.eth.getBalance(e), "ether") + " ether"); 
		i++; 
	})
}