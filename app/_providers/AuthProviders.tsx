'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function AuthProviders({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="cmhlrvm0m00t3jx0dx6ylrr8h"
      clientId="client-WY6SV4qB7htmjeieR4hWqg7MmnfbSQ8xqDCP3dwcad26T"
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          }
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}