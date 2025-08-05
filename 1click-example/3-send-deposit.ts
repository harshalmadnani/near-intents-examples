// Import NEAR JS Libraries
// See docs for more information: https://docs.near.org/tools/near-api
import { KeyPairSigner } from '@near-js/signers';
import { KeyPairString } from '@near-js/crypto';
import { JsonRpcProvider, Provider } from '@near-js/providers';
import { Account } from '@near-js/accounts';
import { NEAR } from '@near-js/tokens';
import 'dotenv/config';

// NEAR Account to send deposit from
const NEAR_ACCOUNT = 'your-account.near';

// Amount of NEAR to deposit
const DEPOSIT_AMOUNT = NEAR.toUnits('0.5');

// Deposit address that was returned from getQuote()
const DEPOSIT_ADDRESS = 'fe120f2d455b42f5db276a5eb137326a217621fd57bca80f21c4510b09872b9a';

// Create signer from private key in .env file
const signer = KeyPairSigner.fromSecretKey(process.env.PRIVATE_KEY as KeyPairString);

// Create provider for RPC connection to NEAR Blockchain
const provider = new JsonRpcProvider({ url: 'https://rpc.fastnear.com' });

// Instantiate NEAR Account to perform transactions
const account = new Account( NEAR_ACCOUNT, provider as Provider, signer);

// Send deposit function
async function sendDeposit() {
  try {
    // transfer 0.005 NEAR tokens to receiver.testnet
    const result = await account.transfer({
      token: NEAR,
      amount: DEPOSIT_AMOUNT,
      receiverId: DEPOSIT_ADDRESS,
    });

    console.log('Deposit sent!');
    console.log( `See transaction: https://nearblocks.io/txns/${result.transaction.hash}`);
  } catch (error) {
    console.error(error);
  }
}

sendDeposit().catch(console.error);
