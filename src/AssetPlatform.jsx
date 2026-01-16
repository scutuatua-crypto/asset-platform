const [autoRules, setAutoRules] = useState([
{ id: 1, name: ‘Bitcoin DCA’, type: ‘Bitcoin’, frequency: ‘Weekly’, amount: ‘$100’, status: ‘active’ },
{ id: 2, name: ‘Ethereum Stack’, type: ‘Ethereum’, frequency: ‘Monthly’, amount: ‘$500’, status: ‘active’ },
{ id: 3, name: ‘Auto Repo Backup’, type: ‘GitHub’, frequency: ‘Daily’, amount: ‘All Repos’, status: ‘active’ },
]);
const [contacts, setContacts] = useState([
{ id: 1, name: ‘Boss’, network: ‘Ethereum’, address: ‘0x742d35Cc6634C0532925a3b8D5C7C2955b4a18e5’, lastSent: ‘2 days ago’ },
{ id: 2, name: ‘Mom’, network: ‘Bitcoin’, address: ‘3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5’, lastSent: ‘1 week ago’ },
{ id: 3, name: ‘Friend John’, network: ‘USDC’, address: ‘0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063’, lastSent: ‘Never’ },
]);
const [showAddContact, setShowAddContact] = useState(false);
const [nfts, setNfts] = useState([
{
id: ‘28’,
name: ‘DuskBreaker #28’,
collection: ‘DuskBreakers’,
image: ‘https://duskbreakers.gg/breaker_images/28.png’,
description: ‘Breakers have the honor of serving humanity through their work on The Dusk.’,
attributes: [
{ trait: ‘Clothes’, value: ‘Locust Rider Armor (Red)’ },
{ trait: ‘Mouth’, value: ‘Big Smile (Purple)’ },
{ trait: ‘Background’, value: ‘Yellow’ }
],
contractAddress: ‘0x0beed7099af7514ccedf642cfea435731176fb02’
},
{
id: ‘5527’,
name: ‘Runner #5527’,
collection: ‘Chain Runners’,
image: ‘https://img.chainrunners.xyz/api/v1/tokens/png/5527’,
description: ‘Chain Runners are Mega City renegades 100% generated on chain.’,
attributes: [
{ trait: ‘Background’, value: ‘Purple Green Diag’ },
{ trait: ‘Race’, value: ‘Human’ },
{ trait: ‘Mouth Accessory’, value: ‘Cig’ }
],
contractAddress: ‘0x97597002980134bea46250aa0510c9b90d87a587’
}
]);
const [selectedNft, setSelectedNft] = useState(null);
