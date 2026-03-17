import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080b12;
    font-family: 'Syne', sans-serif;
    color: #e8e4d9;
  }

  .ap-root {
    min-height: 100vh;
    background: #080b12;
    background-image:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,255,186,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(90,120,255,0.08) 0%, transparent 60%);
    font-family: 'Syne', sans-serif;
    color: #e8e4d9;
    padding: 0 0 80px 0;
  }

  /* HEADER */
  .ap-header {
    padding: 48px 40px 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  .ap-header-left {}

  .ap-logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }

  .ap-logo-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #63ffba;
    box-shadow: 0 0 12px rgba(99,255,186,0.8);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }

  .ap-title {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -1px;
    color: #fff;
    line-height: 1;
  }

  .ap-title span { color: #63ffba; }

  .ap-subtitle {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: rgba(232,228,217,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .ap-header-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(99,255,186,0.07);
    border: 1px solid rgba(99,255,186,0.2);
    border-radius: 100px;
    padding: 8px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #63ffba;
    letter-spacing: 1px;
  }

  .ap-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #63ffba;
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* SECTION WRAPPER */
  .ap-section {
    padding: 48px 40px 0;
  }

  .ap-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .ap-section-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(232,228,217,0.35);
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .ap-section-title {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .ap-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }

  /* NFT GRID */
  .nft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .nft-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
    position: relative;
  }

  .nft-card:hover {
    transform: translateY(-4px);
    border-color: rgba(99,255,186,0.3);
    box-shadow: 0 12px 40px rgba(99,255,186,0.08);
  }

  .nft-card-img-wrap {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nft-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .nft-card:hover .nft-card-img-wrap img {
    transform: scale(1.05);
  }

  .nft-card-body {
    padding: 14px 16px 16px;
  }

  .nft-card-name {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
    letter-spacing: -0.2px;
  }

  .nft-card-collection {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(232,228,217,0.4);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .nft-card-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(8,11,18,0.75);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    padding: 4px 10px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(232,228,217,0.7);
    letter-spacing: 1px;
  }

  .nft-img-broken {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: rgba(232,228,217,0.2);
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .nft-broken-icon {
    font-size: 28px;
    opacity: 0.3;
  }

  /* RULES TABLE */
  .rules-table-wrap {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
  }

  .rules-table {
    width: 100%;
    border-collapse: collapse;
  }

  .rules-table thead tr {
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .rules-table th {
    padding: 14px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(232,228,217,0.35);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    text-align: left;
  }

  .rules-table tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s ease;
  }

  .rules-table tbody tr:last-child {
    border-bottom: none;
  }

  .rules-table tbody tr:hover {
    background: rgba(255,255,255,0.025);
  }

  .rules-table td {
    padding: 16px 20px;
    font-size: 14px;
    color: rgba(232,228,217,0.8);
  }

  .rules-table td.name {
    color: #fff;
    font-weight: 600;
  }

  .rules-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px;
    color: rgba(232,228,217,0.7);
  }

  .rules-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #63ffba;
    letter-spacing: 1px;
  }

  .rules-status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #63ffba;
    box-shadow: 0 0 6px rgba(99,255,186,0.8);
    animation: pulse 2s ease-in-out infinite;
  }

  /* DIVIDER */
  .ap-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 0 40px;
  }
`;

const AssetPlatform = () => {
  const [autoRules] = useState([
    { id: 1, name: 'Bitcoin DCA', type: 'Bitcoin', icon: '₿', frequency: 'Weekly', amount: '$100', status: 'active' },
    { id: 2, name: 'Ethereum Stack', type: 'Ethereum', icon: 'Ξ', frequency: 'Monthly', amount: '$500', status: 'active' },
    { id: 3, name: 'Auto Repo Backup', type: 'GitHub', icon: '⬡', frequency: 'Daily', amount: 'All Repos', status: 'active' },
  ]);

  const [nfts] = useState([
    {
      id: '28',
      name: 'DuskBreaker #28',
      collection: 'DuskBreakers',
      image: 'https://duskbreakers.gg/breaker_images/28.png',
      contractAddress: '0x0beed7099af7514ccedf642cfea435731176fb02'
    },
    {
      id: '5527',
      name: 'Runner #5527',
      collection: 'Chain Runners',
      image: 'https://img.chainrunners.xyz/api/v1/tokens/png/5527',
      contractAddress: '0x97597002980134bea46250aa0510c9b90d87a587'
    }
  ]);

  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ap-root">

        {/* Header */}
        <header className="ap-header">
          <div className="ap-header-left">
            <div className="ap-logo-row">
              <div className="ap-logo-dot" />
              <div className="ap-title">Asset<span>Flow</span></div>
            </div>
            <div className="ap-subtitle">Multi-chain Asset Platform</div>
          </div>
          <div className="ap-header-badge">
            <div className="ap-badge-dot" />
            All systems live
          </div>
        </header>

        {/* NFT Section */}
        <section className="ap-section">
          <div className="ap-section-header">
            <div>
              <div className="ap-section-label">Gallery</div>
              <div className="ap-section-title">My NFT Collection</div>
            </div>
            <div className="ap-section-line" />
          </div>

          <div className="nft-grid">
            {nfts.map(nft => (
              <div key={nft.id} className="nft-card">
                <div className="nft-card-tag"># {nft.id}</div>
                <div className="nft-card-img-wrap">
                  {imgErrors[nft.id] ? (
                    <div className="nft-img-broken">
                      <div className="nft-broken-icon">◻</div>
                      <span>Image unavailable</span>
                    </div>
                  ) : (
                    <img
                      src={nft.image}
                      alt={nft.name}
                      onError={() => handleImgError(nft.id)}
                    />
                  )}
                </div>
                <div className="nft-card-body">
                  <div className="nft-card-name">{nft.name}</div>
                  <div className="nft-card-collection">{nft.collection}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ap-divider" style={{ margin: '48px 40px 0' }} />

        {/* Rules Section */}
        <section className="ap-section">
          <div className="ap-section-header">
            <div>
              <div className="ap-section-label">Automation</div>
              <div className="ap-section-title">Active Rules</div>
            </div>
            <div className="ap-section-line" />
          </div>

          <div className="rules-table-wrap">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Frequency</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {autoRules.map(rule => (
                  <tr key={rule.id}>
                    <td className="name">{rule.name}</td>
                    <td>
                      <span className="rules-type-badge">
                        <span>{rule.icon}</span>
                        {rule.type}
                      </span>
                    </td>
                    <td>{rule.frequency}</td>
                    <td style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px' }}>{rule.amount}</td>
                    <td>
                      <span className="rules-status">
                        <span className="rules-status-dot" />
                        {rule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
};

export default AssetPlatform;
