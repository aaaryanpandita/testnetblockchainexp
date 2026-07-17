import type { Feature } from './types';

import chain from '../chain';
import { getEnvValue } from '../utils';
import opSuperchain from './opSuperchain';

const walletConnectProjectId = 'bd682e2457633b8755ee89d61169f2a3';

const title = 'Blockchain interaction (writing to contract, etc.)';

const config: Feature<{ walletConnect: { projectId: string } }> = (() => {

  // all chain parameters are required for wagmi provider
  // @wagmi/chains/dist/index.d.ts
  const isSingleChain = Boolean(
    chain.id &&
    chain.name &&
    chain.currency.name &&
    chain.currency.symbol &&
    chain.currency.decimals &&
    chain.rpcUrls.length > 0,
  );

  const isOpSuperchain = opSuperchain.isEnabled;

  if (
    (isSingleChain || isOpSuperchain) &&
    walletConnectProjectId
  ) {
    return Object.freeze({
      title,
      isEnabled: true,
      walletConnect: {
        projectId: walletConnectProjectId,
      },
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
