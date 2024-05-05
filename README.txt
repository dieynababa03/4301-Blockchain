README
Setup for 4301 Blockchain Project - Blockchain Based Electronic Voting System
Requirements (only tested with windows):
	
	Node v18.20.2 (install this version via nvm detailed below)
	node-gyp
	Python 3.12.3, Flask 3.0.3
	Ganache 2.7.1
	Truffle v5.11.5 (verify that it shows v0.5.16 for Solidity)
	React (technically no installation)

1. Install Node v18.20.2 (gets you node and npm)
	a. uninstall node.js if you already have a version installed
	b. use this link https://github.com/coreybutler/nvm-windows/releases
		i: under 'Assets' click 'nvm-setup.exe' to install it
		ii: run nvm-setup.exe
		iii: once it is done, open a cmd terminal and run cmd 'nvm install 18'
	c. run cmd 'nvm use 18.20.2;
	d. test node version is correct with command 'node --version'

2. Install node-gyp
	a. run cmd 'npm install -g node-gyp'

3. Install Python 3.12.3
	a. use this link https://www.python.org/downloads/
	b. download the setup and run through as normal
		i: unsure if necessary but i usually allow it 
			to automatically set the PATH variable for me
	
	c. verify version with 'python --version'
	d. verify pip with 'pip --version'
	e. install flask via cmd 'pip install flask'

4. Install Ganache 2.7.1
	a. use this link: https://archive.trufflesuite.com/ganache/
	b. run through download link/setup, ensure version is 2.7.1
	c. launch Ganache
	d. create a new workspace (Ethereum)
	e. under 'Server' ensure:
		- hostname is the '127.0.0.1' option
		- Port # is 7545 
		- Network ID is 5777
	f. under 'Accounts' change the mnemonic to 'NICE' without the single quotes
	g. start the workplace
	h. later we will come back to the settings 
		to add our 'truffle-config' to the truffle files

5. Install Truffle
	a. run this cmd in a terminal 'npm install -g truffle'
	b. once complete, run cmd 'truffle version' and verify the listed versions it shows
		i: for Ganache it will show a different version number (likely v7.9.1)
			this is okay.
6. Verify React
	a. React doesn't need an installation technically
	b. Just verify that npm/npx exist via 'npm --version' or 'npx --version'

6. Getting Project Files
	a. use this link https://github.com/dieynababa03/4301-Blockchain
	b. clone the repository to a directory path of your choosing

7. Installing necessary node_modules
	a. open up a new terminal and ensure the directory is in the one you chose 
		otherwise navigate to it
	b. installing frontend node_modules
		i: navigate to the 4301-blockchain/4301-voting folder
		ii: run cmd 'npm install'
		iii: once complete with no errors, you are good
	c. installing backend node_modules
		i: navigate back to the 4301-blockchain/backend folder
		ii: run cmd 'npm install'
		iii: once complete with no errors, you are good

8. Blockchain setup
	a. open a terminal and navigate to the 4301-blockchain/Ethereum path
	b. run cmd 'truffle compile' (should be successful)
	c. run cmd 'truffle migrate' (should be successful)
		i: may take some time depending on computing power 
	d. open back the Ganache.exe to the created workspace and its settings
		i: under 'Truffle Projects' press 'ADD PROJECT'
		ii: navigate back to 4301-blockchain/Ethereum, click 'truffle-config' and 
			add it to the project
		iii: press 'Save and Restart'

9. Running the project
	a. ensure the IDE or code editor is in the directory of 4301-blockchain/
	b. create 3 separate terminals
		i: 1 terminal in backend/ and run cmd 'python main.py'
		ii: 1 terminal in backend/ and run cmd 'node server.js'
		iii: 1 terminal in 4301-voting/ and run cmd 'npm start'
	c. project may take time when doing the npm start 
		command but everything should be good!

10. Tips on what to do
	- Admin login is ID = 123456789
		- this lets you add a candidate and also remove any candidates
	- Normal user ID is anything that is 9 digits	
		- this lets you vote for a candidate (max one vote)
	- If you want to refresh the blockchain to its original form/data:
		- go back to the terminal that did the truffle commands  (truffle migrate)
		- redo the command of 'truffle migrate'
		- after successful migration, restart the server.js with the terminal
			that ran 'node server.js' with the same command
	
11. Issues that may arise
	- ethereumService.js (used as the account enacting the smart contract methods for 
		every user) is hard coded to one address obtained from Ganache. This is why 
		the mneomic was set to 'NICE' to ensure this is the same across anyone else 
		that follows this. If this has to change, simply obtain a new account with 
		a new privateKey and change the variable 'privateKey' found in 
		backend/ethereumService.js
	- your localhost address may not be 127.0.1.0, please ensure this (should always be 
		default anyways.



