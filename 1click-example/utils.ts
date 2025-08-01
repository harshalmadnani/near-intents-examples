import { TokenResponse } from '@defuse-protocol/one-click-sdk-typescript';

/**
 * Groups tokens by blockchain
 */
export function groupTokensByBlockchain(tokens: TokenResponse[]): Record<string, TokenResponse[]> {
  return tokens.reduce((acc, token) => {
    if (!acc[token.blockchain]) {
      acc[token.blockchain] = [];
    }
    acc[token.blockchain].push(token);
    return acc;
  }, {} as Record<string, TokenResponse[]>);
}

/**
 * Displays tokens grouped by blockchain in a formatted table
 */
export function displayTokensByBlockchain(tokens: TokenResponse[]): void {
  const tokensByBlockchain = groupTokensByBlockchain(tokens);
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
}

/**
 * Displays an example token response format
 */
export function displayTokenExample(tokens: TokenResponse[]): void {
  if (tokens.length > 0) {

  }
} 