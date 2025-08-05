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
    dry: false, 
    
    // Swap execution type - determines whether input or output amount is the basis of the swap
    // EXACT_INPUT: input amount is fixed, output varies
    // EXACT_OUTPUT: output amount is fixed, input varies (refundTo address will receive excess tokens back even after the swap is complete)
    swapType: QuoteRequest.swapType.EXACT_INPUT,
    
    // Maximum acceptable slippage as basis points (100 = 1.00%)
    slippageTolerance: 100, 
    
    // Source token identifier in chain:contract format (ex: Wrapped NEAR)
    // Use getAvailableTokens() to get the correct format or API docs to get the correct format
    originAsset: "nep141:wrap.near",
    
    // Type of deposit address:
    // - ORIGIN_CHAIN: deposit address on the origin chain
    // - INTENTS: deposit address inside of near intents (the verifier smart contract)
    depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
    
    // Target token identifier (ex: Native ETH)
    // Use getAvailableTokens() to get the correct format or API docs to get the correct format
    destinationAsset: "nep141:eth.omft.near",
    
    // Amount to swap (in token's smallest unit/decimals)
    amount: "25000000000000000000000",
    
    // Address to receive refunds if swap fails
    refundTo: "your-account.near", 
    
    // Type of refund address:
    // - ORIGIN_CHAIN: refund to source chain
    // - INTENTS: refund to intents account
    refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
    
    // Final recipient address for the swapped tokens. Format should match recipientType.
    recipient: "0x898552283eAfDEF8855bB935bA119D95521eb6AD", 
    
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