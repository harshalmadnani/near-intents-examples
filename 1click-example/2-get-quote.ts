import { OpenAPI, OneClickService, QuoteRequest } from '@defuse-protocol/one-click-sdk-typescript';

/**
 * Step 2: Get Quote
 *
 * This endpoint retrieves a quote for cross-chain token swaps.
 * It calculates the expected output and fees for a given swap configuration.
 * Will provide a quote and unique deposit address to send the funds to.
 * 
 */

// Initialize the API client
OpenAPI.BASE = 'https://1click.chaindefuser.com';

// Configure your JSON Web Token (JWT) required for most endpoints
// Request one here -> https://docs.google.com/forms/d/e/1FAIpQLSdrSrqSkKOMb_a8XhwF0f7N5xZ0Y5CYgyzxiAuoC2g4a2N68g/viewform
OpenAPI.TOKEN = process.env.ONE_CLICK_JWT;

// Example Asset IDs (use getTokens for full list)
const NATIVE_NEAR = "nep141:wrap.near"
const NATIVE_ARB = "nep141:arb-0x912ce59144191c1204e64559fe8253a0e49e6548.omft.near"

// Example Swap Configuration
const isTest = true // set to true for quote estimation / testing, false for actual execution
const senderAddress = 'your-account.near'
const recipientAddress = '0x553e771500f2d7529079918F93d86C0a845B540b'
const originAsset = NATIVE_NEAR
const destinationAsset = NATIVE_ARB
const amount = "100000000000000000000000"


export async function getQuote(dry: boolean, senderAddress: string, recipientAddress: string, originAsset: string, destinationAsset: string, amount: string) {
try {
    const quoteRequest: QuoteRequest = {
    // Testing Mode : set to true for quote estimation / testing, false for actual execution
    // When true, the response will NOT CONTAIN the following fields:
    //  - depositAddress
    //  - timeWhenInactive
    //  - timeEstimate
    //  - deadline
    dry, 
    
    // Swap execution type - determines whether input or output amount is the basis of the swap
    // EXACT_INPUT: input amount is fixed, output varies
    // EXACT_OUTPUT: output amount is fixed, input varies (refundTo address will receive excess tokens back even after the swap is complete)
    swapType: QuoteRequest.swapType.EXACT_INPUT,
    
    // Maximum acceptable slippage as basis points (100 = 1.00%)
    slippageTolerance: 100, 
    
    // Source token identifier in NEP:contract format listed as `assetId`
    // Use getTokens or API docs to get the correct format
    // Example: nep141:wrap.near (Native $NEAR wrapped or unwrapped)
    originAsset,
    
    // Type of deposit address:
    // - ORIGIN_CHAIN: deposit address on the origin chain
    // - INTENTS: deposit address inside of near intents (the verifier smart contract)
    depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
    
    // Target token identifier in NEP:contract format listed as `assetId`
    // Use getTokens or API docs to get the correct format
    // Example: "nep141:eth.bridge.near" ($ETH bridged to NEAR)
    destinationAsset,
    
    // Amount to swap (in token's smallest unit/decimals)
    // Based on the swapType, this will be the INPUT or OUTPUT token amount
    amount,
    
    // Address to receive refunds if swap fails
    refundTo: senderAddress, 
    
    // Type of refund address:
    // - ORIGIN_CHAIN: refund to the account on source chain
    // - INTENTS: refund to the account inside intents contract
    refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
    
    // Final recipient address for the swapped tokens. Format should match recipientType.
    recipient: recipientAddress, 
    
    // Type of recipient address:
    // - DESTINATION_CHAIN: send to destination chain
    // - INTENTS: send to account inside intents contract
    recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN,
    
    // Quote expiration timestamp in ISO format.
    // Swap must execute before this time (currently set to 3 minutes from now)
    deadline: new Date(Date.now() + 3 * 60 * 1000).toISOString(), 
    
    // Referral identifier for fee sharing/tracking
    referral: "referral",
    
    // Maximum time to wait for quote response in milliseconds
    quoteWaitingTimeMs: 3000,
};

    const quote = await OneClickService.getQuote(quoteRequest);
    return quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  getQuote(isTest, senderAddress, recipientAddress, originAsset, destinationAsset, amount)
    .then(result => console.log("\n\nAuthenticated getQuote RESPONSE:", result))
    .catch(console.error);
}