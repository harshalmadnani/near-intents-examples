// Import NEAR JS Libraries
// See docs for more information: https://docs.near.org/tools/near-api
import { KeyPairSigner } from '@near-js/signers';
import { KeyPairString } from '@near-js/crypto';
import { JsonRpcProvider, Provider } from '@near-js/providers';
import { Account } from '@near-js/accounts';
import { NEAR } from '@near-js/tokens';
import 'dotenv/config';


// Create signer from private key in .env file
const signer = KeyPairSigner.fromSecretKey(process.env.PRIVATE_KEY as KeyPairString);

// Create provider for RPC connection to NEAR Blockchain
const provider = new JsonRpcProvider({ url: 'https://rpc.fastnear.com' });

// Instantiate NEAR Account to perform transactions
const account = new Account( process.env.NEAR_ACCOUNT as string, provider as Provider, signer);

async function sendDeposit() {
  try {
    const result = await account.transfer({
      token: NEAR,
      amount: NEAR.toUnits(process.env.DEPOSIT_AMOUNT as string),
      receiverId: process.env.DEPOSIT_ADDRESS as string,
    });

    console.log('Deposit sent!');
    console.log( `See transaction: https://nearblocks.io/txns/${result.transaction.hash}`);
  } catch (error) {
    console.error(error);
  }
}

sendDeposit().catch(console.error);
