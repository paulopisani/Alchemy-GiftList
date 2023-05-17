const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = "03d9bbe34b1cd570674a4524ba3e409005590f96b0b5615d13bf97282f7d8399";
//const myMerkle = new MerkleTree(niceList);
//console.log('MERKLE_ROOT:::::::::::',MERKLE_ROOT);


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = req.body.name;
  const proof = req.body.proof;

  //console.log('Teste nome;', name);

  // TODO: prove that a name is in the list 

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("###################You got a toy Tree!");
  }
  else {
    res.send("!!!!!!!!!!!!!!!!!!You are not on the list :( ");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
