<div align="center">

## 🗼 React Native Control Tower

*The Ultimate VPN Control & Monitoring Solution for React Native*

</div>

<div align="center">

[![npm version](https://badge.fury.io/js/@aliakhgar1%2Freact-native-control-tower.svg)](https://badge.fury.io/js/@aliakhgar1%2Freact-native-control-tower)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)

</div>

<div align="center">

**React Native Control Tower** is a powerful, lightweight library that provides comprehensive VPN protocol management and real-time status monitoring for React Native applications. Built with performance and flexibility in mind, it supports multiple VPN protocols and offers both React hooks and standalone functions for seamless integration.

</div>

---

## ✨ Features

🚀 **Multi-Protocol Support** - Works with 11+ VPN protocols including WireGuard, OpenVPN, IKEv2, and more  
⚡ **Real-time Updates** - Live status monitoring with instant connection state changes  
🪝 **React Hooks Ready** - Modern React patterns with `useVpnStatuses()` hook  
🔧 **Standalone Functions** - Use outside React components with static functions  
📊 **Connection Insights** - Get detailed connection status, titles, and active protocol info  
💪 **TypeScript Support** - Full type safety with comprehensive TypeScript definitions  
🎯 **Lightweight** - Minimal footprint with zero external dependencies  
🔄 **Event-Driven** - Efficient listener-based architecture for optimal performance  
🛡️ **Reliable** - Battle-tested architecture with robust error handling  
📱 **Cross-Platform** - Works seamlessly on both iOS and Android  
⚙️ **Easy Integration** - Simple API design for quick setup and usage  

## 📦 Installation

```bash
npm install @aliakhgar1/react-native-control-tower
```

```bash
yarn add @aliakhgar1/react-native-control-tower
```

## 🚀 Quick Showcase

### Using with React Hooks

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function VPNStatusComponent() {
  const { VPNStatusTitle, updateVpnStatus, connectedVpnType } = 
    ControlTower.useVpnStatuses();

  return (
    <View>
      <Text>Status: {VPNStatusTitle}</Text>
      <Text>Connected VPN: {connectedVpnType || 'None'}</Text>
    </View>
  );
}
```

### Using Outside React Components

```javascript
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Update VPN status
ControlTower.updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTED);

// Get current status
const status = ControlTower.getVpnConnectionStatus();
const statusTitle = ControlTower.getVpnConnectionStatusTitle();
const activeVPN = ControlTower.getConnectedVpnType();

console.log(`Status: ${statusTitle}, Active VPN: ${activeVPN}`);
```

## 📚 Complete Usage Guide

### 🎯 Supported VPN Protocols

Control Tower supports these VPN protocols out of the box:

- **WireGuard** - Modern, fast, and secure VPN protocol
- **OpenVPN** - Industry-standard VPN protocol
- **IKEv2** - Internet Key Exchange version 2
- **OpenConnect** - SSL VPN client
- **L2TP** - Layer 2 Tunneling Protocol
- **PPTP** - Point-to-Point Tunneling Protocol
- **SSTP** - Secure Socket Tunneling Protocol
- **SoftEther** - Multi-protocol VPN software
- **V2Ray** - Platform for building proxies
- **SSH** - Secure Shell tunneling
- **SingBox** - Universal proxy platform

### 🔗 Connection States

```javascript
import { ConnectionStatus } from '@aliakhgar1/react-native-control-tower';

// Available connection states:
ConnectionStatus.DISCONNECTED  // '0' - Not connected
ConnectionStatus.DISCONNECTING // '1' - Disconnecting
ConnectionStatus.CONNECTING    // '2' - Connecting
ConnectionStatus.CONNECTED     // '3' - Connected
ConnectionStatus.INVALID       // '-1' - Invalid state
ConnectionStatus.ERROR         // '-2' - Error occurred
```

### 🪝 React Hook Usage

The `useVpnStatuses()` hook provides real-time VPN status monitoring:

```javascript
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function VPNDashboard() {
  const { 
    VPNStatuses,           // All VPN statuses object
    VPNStatus,             // Overall connection status
    VPNStatusTitle,        // Human-readable status
    connectedVpnType,      // Currently connected VPN type
    updateVpnStatus,       // Function to update status
    getVpnStatuses         // Function to get all statuses
  } = ControlTower.useVpnStatuses();

  const connectWireGuard = () => {
    updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTING);
    // Simulate connection process
    setTimeout(() => {
      updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTED);
    }, 2000);
  };

  const disconnectAll = () => {
    Object.keys(VPNStatuses).forEach(vpnType => {
      updateVpnStatus(vpnType, ControlTower.ConnectionStatus.DISCONNECTED);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        VPN Status: {VPNStatusTitle}
      </Text>
      
      {connectedVpnType && (
        <Text style={{ fontSize: 18, color: 'green' }}>
          Connected via: {connectedVpnType}
        </Text>
      )}

      <View style={{ marginTop: 20 }}>
        {Object.entries(VPNStatuses).map(([vpnType, status]) => (
          <Text key={vpnType}>
            {vpnType}: {status === '3' ? '🟢 Connected' : 
                      status === '2' ? '🟡 Connecting' : 
                      status === '1' ? '🟠 Disconnecting' : '🔴 Disconnected'}
          </Text>
        ))}
      </View>

      <Button title="Connect WireGuard" onPress={connectWireGuard} />
      <Button title="Disconnect All" onPress={disconnectAll} />
    </View>
  );
}
```

### 📡 Integration with VPN Libraries

Here's how to integrate with popular VPN libraries:

#### WireGuard Integration

```javascript
import * as Wireguard from 'react-native-wireguard';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Listen to WireGuard state changes
const WGSub = Wireguard.addWireguardStateChangeListener((WGState) => {
  ControlTower.updateVpnStatus('WireGuard', WGState?.state);
});

// Don't forget to clean up
// WGSub.remove();
```

#### OpenVPN Integration

```javascript
import OpenVPN from 'react-native-openvpn';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

OpenVPN.addVpnStateListener((state) => {
  // Map OpenVPN states to Control Tower states
  let controlTowerState;
  switch (state.state) {
    case 'CONNECTED':
      controlTowerState = ControlTower.ConnectionStatus.CONNECTED;
      break;
    case 'CONNECTING':
      controlTowerState = ControlTower.ConnectionStatus.CONNECTING;
      break;
    case 'DISCONNECTING':
      controlTowerState = ControlTower.ConnectionStatus.DISCONNECTING;
      break;
    default:
      controlTowerState = ControlTower.ConnectionStatus.DISCONNECTED;
  }
  
  ControlTower.updateVpnStatus('OpenVPN', controlTowerState);
});
```

#### IKEv2 Integration

```javascript
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Example with custom IKEv2 implementation
function setupIKEv2Monitoring() {
  // Your IKEv2 connection logic here
  const connectIKEv2 = async () => {
    try {
      ControlTower.updateVpnStatus('Ikev2', ControlTower.ConnectionStatus.CONNECTING);
      
      // Your connection code here
      await ikev2Connect();
      
      ControlTower.updateVpnStatus('Ikev2', ControlTower.ConnectionStatus.CONNECTED);
    } catch (error) {
      ControlTower.updateVpnStatus('Ikev2', ControlTower.ConnectionStatus.ERROR);
    }
  };
}
```

### 🔧 Standalone Functions

Use Control Tower outside React components:

```javascript
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Update any VPN status
ControlTower.updateVpnStatus('V2Ray', ControlTower.ConnectionStatus.CONNECTED);
ControlTower.updateVpnStatus('OpenVPN', ControlTower.ConnectionStatus.CONNECTING);

// Get overall connection status
const overallStatus = ControlTower.getVpnConnectionStatus();
console.log('Overall Status:', overallStatus); // '3' if any VPN is connected

// Get human-readable status title
const statusTitle = ControlTower.getVpnConnectionStatusTitle();
console.log('Status Title:', statusTitle); // 'CONNECTED', 'CONNECTING', etc.

// Get currently connected VPN type
const activeVPN = ControlTower.getConnectedVpnType();
console.log('Active VPN:', activeVPN); // 'V2Ray' or undefined

// Get all VPN statuses
const allStatuses = ControlTower.getVpnStatuses();
console.log('All Statuses:', allStatuses);
/* Output:
{
  OpenConnect: '0',
  OpenVPN: '2',
  Ikev2: '0',
  WireGuard: '0',
  // ... other protocols
  V2Ray: '3',
  // ...
}
*/
```

### 🎨 Advanced Usage Patterns

#### Multi-Protocol Dashboard

```javascript
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function MultiProtocolDashboard() {
  const { VPNStatuses, updateVpnStatus } = ControlTower.useVpnStatuses();

  const protocols = [
    { name: 'WireGuard', icon: '🔐', color: '#FF6B6B' },
    { name: 'OpenVPN', icon: '🛡️', color: '#4ECDC4' },
    { name: 'IKEv2', icon: '⚡', color: '#45B7D1' },
    { name: 'V2Ray', icon: '🚀', color: '#96CEB4' },
  ];

  const toggleConnection = (protocol) => {
    const currentStatus = VPNStatuses[protocol];
    const newStatus = currentStatus === ControlTower.ConnectionStatus.CONNECTED 
      ? ControlTower.ConnectionStatus.DISCONNECTED
      : ControlTower.ConnectionStatus.CONNECTED;
    
    updateVpnStatus(protocol, newStatus);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 }}>
        🗼 VPN Control Tower
      </Text>
      
      {protocols.map((protocol) => (
        <TouchableOpacity
          key={protocol.name}
          onPress={() => toggleConnection(protocol.name)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            marginVertical: 8,
            backgroundColor: protocol.color,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 24, marginRight: 12 }}>{protocol.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              {protocol.name}
            </Text>
            <Text style={{ color: 'white', opacity: 0.8 }}>
              {VPNStatuses[protocol.name] === ControlTower.ConnectionStatus.CONNECTED 
                ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
          <Text style={{ fontSize: 20 }}>
            {VPNStatuses[protocol.name] === ControlTower.ConnectionStatus.CONNECTED ? '🟢' : '🔴'}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
```

#### Background Status Monitoring

```javascript
import { AppState } from 'react-native';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

class VPNBackgroundMonitor {
  constructor() {
    this.setupBackgroundMonitoring();
  }

  setupBackgroundMonitoring() {
    // Monitor app state changes
    AppState.addEventListener('change', this.handleAppStateChange);
    
    // Set up periodic status checks
    this.statusInterval = setInterval(() => {
      this.checkVPNStatuses();
    }, 5000); // Check every 5 seconds
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      // App came to foreground, refresh all statuses
      this.refreshAllStatuses();
    }
  };

  checkVPNStatuses() {
    const currentStatuses = ControlTower.getVpnStatuses();
    const connectedVPN = ControlTower.getConnectedVpnType();
    
    if (connectedVPN) {
      console.log(`Background check: ${connectedVPN} is connected`);
      // You could send notifications, update UI, etc.
    }
  }

  refreshAllStatuses() {
    // Implement your logic to check actual VPN states
    // and update Control Tower accordingly
    console.log('Refreshing all VPN statuses...');
  }

  cleanup() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
}

// Usage
const monitor = new VPNBackgroundMonitor();
```

## 📖 API Reference

### Hooks

#### `useVpnStatuses()`

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `VPNStatuses` | `Record<VpnType, ConnectionStatus>` | Object containing all VPN statuses |
| `VPNStatus` | `ConnectionStatus` | Overall connection status |
| `VPNStatusTitle` | `string \| undefined` | Human-readable status title |
| `connectedVpnType` | `VpnType \| undefined` | Currently connected VPN protocol |
| `updateVpnStatus` | `Function` | Function to update VPN status |
| `getVpnStatuses` | `Function` | Function to get all VPN statuses |

### Functions

#### `updateVpnStatus(vpnType, status)`

Updates the status of a specific VPN protocol.

**Parameters:**
- `vpnType`: `VpnType` - The VPN protocol type
- `status`: `ConnectionStatus` - The new connection status

#### `getVpnStatuses()`

Returns all VPN statuses as an object.

**Returns:** `Record<VpnType, ConnectionStatus>`

#### `getVpnConnectionStatus()`

Gets the overall connection status across all VPN protocols.

**Returns:** `ConnectionStatus`

#### `getVpnConnectionStatusTitle()`

Gets the human-readable title for the current connection status.

**Returns:** `string | undefined`

#### `getConnectedVpnType()`

Gets the currently connected VPN protocol type.

**Returns:** `VpnType | undefined`

### Types

#### `VpnType`

```typescript
type VpnType = 
  | 'OpenConnect'
  | 'OpenVPN' 
  | 'Ikev2'
  | 'WireGuard'
  | 'L2TP'
  | 'PPTP'
  | 'SSTP'
  | 'SoftEther'
  | 'V2Ray'
  | 'SSH'
  | 'SingBox';
```

#### `ConnectionStatus`

```typescript
enum ConnectionStatus {
  DISCONNECTED = '0',
  DISCONNECTING = '1', 
  CONNECTING = '2',
  CONNECTED = '3',
  INVALID = '-1',
  ERROR = '-2',
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Ali Akhgar](https://github.com/AliAkhgar)

---

<div align="center">

**Made with ❤️ for the React Native community**

[🐛 Report Bug](https://github.com/AliAkhgar/react-native-control-tower/issues) • [✨ Request Feature](https://github.com/AliAkhgar/react-native-control-tower/issues) • [💬 Discussions](https://github.com/AliAkhgar/react-native-control-tower/discussions)

</div>
