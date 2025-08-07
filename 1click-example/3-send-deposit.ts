import { getAccount } from "./near";
import { NEAR } from "@near-js/tokens";
import "dotenv/config";

/**
 * Step 3: Send Deposit to Quote Address
 *
 * This endpoint retrieves a quote for cross-chain token swaps.
 * It calculates the expected output and fees for a given swap configuration.
 * Will provide a quote and unique deposit address to send the funds to.
 *
 */

const senderAccount = "your-account.near";
const senderPrivateKey = process.env.SENDER_PRIVATE_KEY as string;
const depositAmount = "100000000000000000000000";
export const depositAddress = "78358c22d3add57c56689647acc3a821e314e972585f87aedc6307087cae74b8";

export async function sendTokens(
  senderAccount: string,
  senderPrivateKey: string,
  depositAddress: string,
  depositAmount: string
) {
  try {
    const account = await getAccount(senderAccount, senderPrivateKey);
    const result = await account.transfer({
      token: NEAR,
      amount: depositAmount,
      receiverId: depositAddress as string,
    });


    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  sendTokens(
    senderAccount,
    senderPrivateKey,
    depositAddress,
    depositAmount
  ) 
    .then(result => console.log(`\nDeposit sent! \n See transaction: https://nearblocks.io/txns/${result.transaction.hash}`))
    .catch(console.error);
}
