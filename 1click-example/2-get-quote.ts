import { OneClickService, QuoteRequest } from '@defuse-protocol/one-click-sdk-typescript';

/**
 * Step 2: Get Quote
 *
 * This endpoint retrieves a quote for cross-chain token swaps.
 * It calculates the expected output and fees for a given swap configuration.
 * Will provide a quote and unique deposit address to send the funds to.
 * 
 */

async function getQuote() {
try {
    const quoteRequest: QuoteRequest = {
    // Simulation Mode - set to true for quote estimation, false for actual execution
    // When true, the response will NOT CONTAIN the following fields:
    // - depositAddress
    // - timeWhenInactive
    // - timeEstimate
    // - deadline
    dry: true, 
    
    // Swap execution type - determines whether input or output amount is the basis of the swap
    // EXACT_INPUT: input amount is fixed, output varies
    // EXACT_OUTPUT: output amount is fixed, input varies (refundTo address will receive excess tokens back even after the swap is complete)
    swapType: QuoteRequest.swapType.EXACT_INPUT,
    
    // Maximum acceptable slippage as basis points (100 = 1.00%)
    slippageTolerance: 100, 
    
    // Source token identifier in chain:contract format (ex: Arbitrum USDC bridged to NEAR)
    // Use getAvailableTokens() to get the correct format or API docs to get the correct format
    originAsset: "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
    
    // Type of deposit address:
    // - ORIGIN_CHAIN: deposit address on the origin chain
    // - INTENTS: deposit address inside of near intents (the verifier smart contract)
    depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
    
    // Target token identifier (ex: Solana token bridged to NEAR)
    // Use getAvailableTokens() to get the correct format or API docs to get the correct format
    destinationAsset: "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
    
    // Amount to swap (in token's smallest unit/decimals)
    amount: "379000",
    
    // Address to receive refunds if swap fails
    refundTo: "0x2527D02599Ba641c19FEa793cD0F167589a0f10D", 
    
    // Type of refund address:
    // - ORIGIN_CHAIN: refund to source chain
    // - INTENTS: refund to intents account
    refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
    
    // Final recipient address for the swapped tokens. Format should match recipientType.
    recipient: "13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK", 
    
    // Type of recipient address:
    // - DESTINATION_CHAIN: send to destination chain
    // - INTENTS: send to intents account
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
    console.log("Authenticated getQuote RESPONSE:", quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
}

getQuote().catch(console.error);