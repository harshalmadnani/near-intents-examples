import {
  OneClickService,
  TokenResponse,
} from '@defuse-protocol/one-click-sdk-typescript';
import './config'; // Import shared configuration

/**
 * Step 1: Get Available Tokens
 *
 * This endpoint doesn't require JWT authentication.
 * It returns a list of all supported tokens across different blockchains.
 */
async function getAvailableTokens() {
  try {
    console.log('Fetching available tokens...');
    const tokens = await OneClickService.getTokens();

    console.log(`Found ${tokens.length} available tokens:\n`);

    // Group tokens by blockchain
    const tokensByBlockchain = tokens.reduce((acc, token) => {
      if (!acc[token.blockchain]) {
        acc[token.blockchain] = [];
      }
      acc[token.blockchain].push(token);
      return acc;
    }, {} as Record<string, TokenResponse[]>);

    // Sort blockchains alphabetically and display
    const sortedBlockchains = Object.keys(tokensByBlockchain).sort();

    sortedBlockchains.forEach((blockchain) => {
      // Sort tokens within each blockchain by symbol
      const sortedTokens = tokensByBlockchain[blockchain].sort((a, b) =>
        a.symbol.localeCompare(b.symbol)
      );

      console.log(`\n━━━ Chain: ${blockchain.toUpperCase()} ━━━`);
      console.table(
        sortedTokens.map((token) => ({
          Symbol: token.symbol,
          'Asset ID': token.assetId || 'N/A',
          'Contract Address': token.contractAddress || 'N/A',
        }))
      );
    });

    return tokens;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
}

getAvailableTokens().catch(console.error);
