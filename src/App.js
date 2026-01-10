import React, { useState, useEffect } from ‘react’;
import { Plus, Wallet, TrendingUp, Settings, Bell, Eye, EyeOff, Copy, Check, LogOut, Trash2 } from ‘lucide-react’;

const App = () => {
const [currentView, setCurrentView] = useState(‘dashboard’);
const [user, setUser] = useState(null);
const [assets, setAssets] = useState([]);
const [autoRules, setAutoRules] = useState([]);
const [showBalance, setShowBalance] = useState(true);
const [copied, setCopied] = useState(’’);
const [isLoading, setIsLoading] = useState(false);

// Load data from localStorage on mount
useEffect(() => {
const savedUser = localStorage.getItem(‘assetflow_user’);
const savedAssets = localStorage.getItem(‘assetflow_assets’);
const savedRules = localStorage.getItem(‘assetflow_rules’);

```
if (savedUser) {
  setUser(JSON.parse(savedUser));
}
if (savedAssets) {
  setAssets(JSON.parse(savedAssets));
} else {
  setAssets([
    { id: 1, type: 'Bitcoin', amount: 0.05234, value: 2156.78, change: '+5.2%', status: 'active' },
    { id: 2, type: 'Ethereum', amount: 1.2456, value: 2890.45, change: '+2.1%', status: 'active' },
    { id: 3, type: 'USDC', amount: 5000, value: 5000, change: '+0.1%', status: 'active' },
  ]);
}
if (savedRules) {
  setAutoRules(JSON.parse(savedRules));
} else {
  setAutoRules([
    { id: 1, name: 'Bitcoin DCA', type: 'Bitcoin', frequency: 'Weekly', amount: '$100', status: 'active' },
    { id: 2, name: 'Ethereum Stack', type: 'Ethereum', frequency: 'Monthly', amount: '$500', status: 'active' },
  ]);
}
```

}, []);

useEffect(() => {
if (user) {
localStorage.setItem(‘assetflow_user’, JSON.stringify(user));
}
}, [user]);

useEffect(() => {
localStorage.setItem(‘assetflow_assets’, JSON.stringify(assets));
}, [assets]);

useEffect(() => {
localStorage.setItem(‘assetflow_rules’, JSON.stringify(autoRules));
}, [autoRules]);

const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

const copyToClipboard = (text, type) => {
navigator.clipboard.writeText(text);
setCopied(type);
setTimeout(() => setCopied(’’), 2000);
};

const handleLogout = () => {
if (window.confirm(‘Are you sure you want to logout?’)) {
localStorage.removeItem(‘assetflow_user’);
setUser(null);
setCurrentView(‘dashboard’);
}
};

const addNewAsset = () => {
const assetType = prompt(‘Enter asset type (e.g., Bitcoin, Ethereum):’);
if (!assetType) return;

```
const amount = parseFloat(prompt('Enter amount:'));
if (isNaN(amount)) return;

const value = parseFloat(prompt('Enter current value in USD:'));
if (isNaN(value)) return;

const newAsset = {
  id: Date.now(),
  type: assetType,
  amount: amount,
  value: value,
  change: '+0.0%',
  status: 'active'
};

setAssets([...assets, newAsset]);
alert('Asset added successfully!');
```

};

const deleteAsset = (id) => {
if (window.confirm(‘Are you sure you want to delete this asset?’)) {
setAssets(assets.filter(asset => asset.id !== id));
}
};

const addNewRule = () => {
const ruleName = prompt(‘Enter rule name:’);
if (!ruleName) return;

```
const assetType = prompt('Enter asset type (Bitcoin, Ethereum, USDC):');
if (!assetType) return;

const frequency = prompt('Enter frequency (Daily, Weekly, Monthly):');
if (!frequency) return;

const amount = prompt('Enter amount (e.g., $100):');
if (!amount) return;

const newRule = {
  id: Date.now(),
  name: ruleName,
  type: assetType,
  frequency: frequency,
  amount: amount,
  status: 'active'
};

setAutoRules([...autoRules, newRule]);
alert('Rule created successfully!');
```

};

const toggleRuleStatus = (id) => {
setAutoRules(autoRules.map(rule =>
rule.id === id
? { …rule, status: rule.status === ‘active’ ? ‘paused’ : ‘active’ }
: rule
));
};

const deleteRule = (id) => {
if (window.confirm(‘Are you sure you want to delete this rule?’)) {
setAutoRules(autoRules.filter(rule => rule.id !== id));
}
};

const LoginForm = () => {
const [loginData, setLoginData] = useState({ email: ‘’, password: ‘’, name: ‘’ });
const [isRegister, setIsRegister] = useState(false);

```
const handleAuth = () => {
  if (!loginData.email) {
    alert('Please enter an email');
    return;
  }
  
  if (isRegister && !loginData.name) {
    alert('Please enter your name');
    return;
  }

  setIsLoading(true);
  setTimeout(() => {
    setUser({ 
      name: isRegister ? loginData.name : loginData.email.split('@')[0], 
      email: loginData.email 
    });
    setIsLoading(false);
  }, 1000);
};

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">AssetFlow Pro</h1>
        <p className="text-gray-300">Professional Asset Management Platform</p>
      </div>
      
      <div className="space-y-4">
        {isRegister && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
              value={loginData.name}
              onChange={(e) => setLoginData({...loginData, name: e.target.value})}
            />
          </div>
        )}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
          />
        </div>
        <button
          onClick={handleAuth}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-300 hover:text-blue-200 text-sm"
        >
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
        </button>
      </div>
      
      <div className="mt-6 text-center text-gray-400 text-sm">
        🔒 Secure Platform with Local Storage
      </div>
    </div>
  </div>
);
```

};

const Dashboard = () => (
<div className="space-y-6">
<div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="text-lg font-medium opacity-90">Total Portfolio Value</h2>
<div className="flex items-center gap-2 mt-1">
<span className="text-3xl font-bold">
{showBalance ? `$${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ‘••••••’}
</span>
<button
onClick={() => setShowBalance(!showBalance)}
className=“p-1 hover:bg-white/10 rounded”
>
{showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
</button>
</div>
</div>
<div className="text-right">
<div className="text-sm opacity-90">24h Change</div>
<div className="text-xl font-semibold text-green-300">+$234.56</div>
</div>
</div>

```
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-white/10 rounded-lg p-3">
        <div className="text-sm opacity-90">Active Assets</div>
        <div className="text-xl font-semibold">{assets.length}</div>
      </div>
      <div className="bg-white/10 rounded-lg p-3">
        <div className="text-sm opacity-90">Auto Rules</div>
        <div className="text-xl font-semibold">{autoRules.filter(r => r.status === 'active').length}</div>
      </div>
      <div className="bg-white/10 rounded-lg p-3">
        <div className="text-sm opacity-90">This Month</div>
        <div className="text-xl font-semibold">+12.3%</div>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">Your Assets</h3>
      <button 
        onClick={addNewAsset}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Asset
      </button>
    </div>
    
    <div className="space-y-4">
      {assets.map((asset) => (
        <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
              {asset.type[0]}
            </div>
            <div>
              <div className="font-semibold">{asset.type}</div>
              <div className="text-sm text-gray-600">{asset.amount} {asset.type.split(' ')[0]}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold">${asset.value.toLocaleString()}</div>
              <div className={`text-sm ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change}
              </div>
            </div>
            <button
              onClick={() => deleteAsset(asset.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      
      {assets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No assets yet. Click "Add Asset" to get started!</p>
        </div>
      )}
    </div>
  </div>
</div>
```

);

const AutoRules = () => (
<div className="space-y-6">
<div className="flex justify-between items-center">
<h2 className="text-2xl font-bold">Automatic Rules</h2>
<button 
onClick={addNewRule}
className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
>
<Plus className="w-4 h-4" />
New Rule
</button>
</div>

```
  <div className="grid gap-6">
    {autoRules.map((rule) => (
      <div key={rule.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{rule.name}</h3>
            <p className="text-gray-600">Automatically receive {rule.type}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm ${
            rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {rule.status}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-600">Frequency</div>
            <div className="font-semibold">{rule.frequency}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Amount</div>
            <div className="font-semibold">{rule.amount}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Next Execution</div>
            <div className="font-semibold">Tomorrow</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => toggleRuleStatus(rule.id)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {rule.status === 'active' ? 'Pause' : 'Activate'}
          </button>
          <button 
            onClick={() => deleteRule(rule.id)}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    
    {autoRules.length === 0 && (
      <div className="text-center py-12 text-gray-500 bg-white rounded-2xl">
        <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No automatic rules yet. Click "New Rule" to create one!</p>
      </div>
    )}
  </div>
</div>
```

);

const ReceiveAssets = () => (
<div className="space-y-6">
<h2 className="text-2xl font-bold">Receive Assets</h2>

```
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Your Receiving Addresses</h3>
    
    <div className="space-y-4">
      {[
        { name: 'Bitcoin', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5', network: 'BTC' },
        { name: 'Ethereum', address: '0x742d35Cc6634C0532925a3b8D5C7C2955b4a18e5', network: 'ETH' },
        { name: 'Binance Smart Chain', address: '0x742d35Cc6634C0532925a3b8D5C7C2955b4a18e5', network: 'BSC' },
      ].map((wallet, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">{wallet.name}</div>
            <div className="text-sm bg-gray-100 px-2 py-1 rounded">{wallet.network}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 p-3 rounded-lg font-mono text-sm break-all">
              {wallet.address}
            </div>
            <button
              onClick={() => copyToClipboard(wallet.address, wallet.name)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {copied === wallet.name ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">QR Codes</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['Bitcoin', 'Ethereum', 'USDC'].map((asset, index) => (
        <div key={index} className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
            <div className="text-4xl">📱</div>
          </div>
          <div className="font-semibold">{asset}</div>
        </div>
      ))}
    </div>
  </div>
</div>
```

);

const SettingsView = () => (
<div className="space-y-6">
<h2 className="text-2xl font-bold">Settings</h2>

```
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Account</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
        <div>
          <div className="font-medium">Email</div>
          <div className="text-sm text-gray-600">{user?.email}</div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
        <div>
          <div className="font-medium">Name</div>
          <div className="text-sm text-gray-600">{user?.name}</div>
        </div>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
    <div className="space-y-4">
      {[
        { label: 'Asset Received', description: 'Get notified when assets are received' },
        { label: 'Price Alerts', description: 'Alerts for significant price changes' },
        { label: 'Weekly Summary', description: 'Weekly portfolio performance report' },
      ].map((setting, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <div className="font-medium">{setting.label}</div>
            <div className="text-sm text-gray-600">{setting.description}</div>
          </div>
          <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Security</h3>
    <div className="space-y-4">
      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="font-medium">Two-Factor Authentication</div>
        <div className="text-sm text-gray-600">Add an extra layer of security</div>
      </button>
      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="font-medium">Change Password</div>
        <div className="text-sm text-gray-600">Update your account password</div>
      </button>
      <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="font-medium">API Keys</div>
        <div className="text-sm text-gray-600">Manage your API access</div>
      </button>
    </div>
  </div>

  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
    <button 
      onClick={handleLogout}
      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-semibold"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </div>
</div>
```

);

if (!user) {
return <LoginForm />;
}

return (
<div className="min-h-screen bg-gray-50">
<nav className="bg-white border-b border-gray-200 px-6 py-4">
<div className="flex justify-between items-center max-w-7xl mx-auto">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-purple-700 w-8 h-8 rounded-lg flex items-center justify-center">
<Wallet className="w-5 h-5 text-white" />
</div>
<span className="text-xl font-bold">AssetFlow</span>
</div>

```
        <div className="hidden md:flex gap-6">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { key: 'auto-rules', label: 'Auto Rules', icon: Settings },
            { key: 'receive', label: 'Receive', icon: Wallet },
            { key: 'settings', label: 'Settings', icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
          {user.name[0].toUpperCase()}
        </div>
      </div>
    </div>
  </nav>

  <main className="max-w-7xl mx-auto px-6 py-8">
    {currentView === 'dashboard' && <Dashboard />}
    {currentView === 'auto-rules' && <AutoRules />}
    {currentView === 'receive' && <ReceiveAssets />}
    {currentView === 'settings' && <SettingsView />}
  </main>
</div>
```

);
};

export default App;
