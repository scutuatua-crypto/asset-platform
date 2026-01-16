import React, { useState } from 'react';

const AssetPlatform = () => {
  // 1. Automation Rules State
  const [autoRules, setAutoRules] = useState([
    { id: 1, name: 'Bitcoin DCA', type: 'Bitcoin', frequency: 'Weekly', amount: '$100', status: 'active' },
    { id: 2, name: 'Ethereum Stack', type: 'Ethereum', frequency: 'Monthly', amount: '$500', status: 'active' },
    { id: 3, name: 'Auto Repo Backup', type: 'GitHub', frequency: 'Daily', amount: 'All Repos', status: 'active' },
  ]);

  // 2. Contacts State
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Boss', network: 'Ethereum', address: '0x742d35Cc6634C0532925a3b8D5C7C2955b4a18e5', lastSent: '2 days ago' },
    { id: 2, name: 'Mom', network: 'Bitcoin', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5', lastSent: '1 week ago' },
    { id: 3, name: 'Friend John', network: 'USDC', address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', lastSent: 'Never' },
  ]);

  const [showAddContact, setShowAddContact] = useState(false);

  // 3. NFTs State
  const [nfts, setNfts] = useState([
    {
      id: '28',
      name: 'DuskBreaker #28',
      collection: 'DuskBreakers',
      image: 'https://duskbreakers.gg/breaker_images/28.png',
      description: 'Breakers have the honor of serving humanity through their work on The Dusk.',
      attributes: [
        { trait: 'Clothes', value: 'Locust Rider Armor (Red)' },
        { trait: 'Mouth', value: 'Big Smile (Purple)' },
        { trait: 'Background', value: 'Yellow' }
      ],
      contractAddress: '0x0beed7099af7514ccedf642cfea435731176fb02'
    },
    {
      id: '5527',
      name: 'Runner #5527',
      collection: 'Chain Runners',
      image: 'https://img.chainrunners.xyz/api/v1/tokens/png/5527',
      description: 'Chain Runners are Mega City renegades 100% generated on chain.',
      attributes: [
        { trait: 'Background', value: 'Purple Green Diag' },
        { trait: 'Race', value: 'Human' },
        { trait: 'Mouth Accessory', value: 'Cig' }
      ],
      contractAddress: '0x97597002980134bea46250aa0510c9b90d87a587'
    }
  ]);

  const [selectedNft, setSelectedNft] = useState(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ borderBottom: '2px solid #333', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>AssetFlow Platform</h1>
        <p style={{ color: '#666' }}>Automatic Asset Receiving Platform with Multi-chain Support</p>
      </header>
      
      <main>
        {/* NFT Gallery Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#444' }}>My NFT Collection</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {nfts.map(nft => (
              <div key={nft.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '15px', 
                backgroundColor: '#fff',
                width: '200px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <img src={nft.image} alt={nft.name} style={{ width: '100%', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{nft.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#777' }}>{nft.collection}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Automation Rules Table */}
        <section>
          <h2 style={{ color: '#444' }}>Automation Rules</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#333', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Type</th>
                <th style={{ padding: '10px' }}>Frequency</th>
                <th style={{ padding: '10px' }}>Amount</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {autoRules.map(rule => (
                <tr key={rule.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{rule.name}</td>
                  <td style={{ padding: '10px' }}>{rule.type}</td>
                  <td style={{ padding: '10px' }}>{rule.frequency}</td>
                  <td style={{ padding: '10px' }}>{rule.amount}</td>
                  <td style={{ padding: '10px', color: 'green' }}>{rule.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AssetPlatform;
