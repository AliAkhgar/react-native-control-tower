<div align="center">

<h1>🗼 React Native Control Tower</h1>

![Gemini_Generated_Image_yivo3gyivo3gyivo-2](https://github.com/user-attachments/assets/a065a676-70b0-4bab-b996-a23ead24bc88)

*VPN Control & Monitoring Solution for React Native*

</div>

<div align="center">

[![npm version](https://badge.fury.io/js/@aliakhgar1%2Freact-native-control-tower.svg)](https://badge.fury.io/js/@aliakhgar1%2Freact-native-control-tower)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)

</div>

<div align="center">

**React Native Control Tower** is a lightweight library that provides comprehensive VPN protocol management and real-time status monitoring for React Native applications. Built with flexibility, it supports multiple VPN protocols and offers both React hooks and standalone functions for enhanced integration.

</div>

---

## ✨ Features

🚀 **Multi-Protocol Support** - Keeps track of multiple VPN protocols states  
⚡ **Real-time Updates** - Live status monitoring with instant connection state changes  
🪝 **React Hooks Ready** - Modern React patterns with hooks  
🔧 **Standalone Functions** - Use outside React components with static functions  
💪 **TypeScript Support** - Full type safety with comprehensive TypeScript definitions  
🎯 **Lightweight** - Minimal footprint with zero external dependencies  
🔄 **Event-Driven** - Efficient listener-based architecture for optimal performance  
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
import * as Wireguard from 'react-native-wireguard';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function VPNStatusComponent() {

  //React Hooks for Reactive Updates
   const { 
    VPNStatuses,           // All VPN statuses object
    VPNStatus,             // connection status type=> -1, 0, 1, 2,...
    VPNStatusTitle,        // Human-readable status
    connectedVpnType,      // Currently connected VPN type
    updateVpnStatus,       // Function to update status
    getVpnStatuses         // Function to get all statuses
  } = ControlTower.useVpnStatuses();

  React.useEffect(() => {

    var WGSub = Wireguard.addWireguardStateChangeListener((WGState) => {
      //Updating ControlTower state for Wireguard without hook functions.
      ControlTower.updateVpnStatus('WireGuard', WGState?.state);
    });

    return () => {
      WGSub.remove();
    };
  }, []);

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

### 📡 Integration with VPN Libraries

Here's how to integrate with popular VPN libraries:

#### Connection Status Natively Compatible Event Integration

Here, Wireguard addWireguardStateChangeListener sends the compatible types to Control Tower by default.

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

#### Abstract Event Data Integration

In this case, you will need to convert the VPN client status to a compatible status which Control Tower accepts.

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

This is the map of compatible statues which Control Tower accepts and sends back as status.

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


## 📖 API Reference

For complete API documentation including hooks, functions, types, and usage examples, see:

👉 **[API Reference](./API_REFERENCE.md)**

The API Reference includes:
- React hooks (`useVpnStatuses`)
- Standalone functions (`updateVpnStatus`, `getVpnConnectionStatus`, etc.)
- TypeScript type definitions (`VpnType`, `ConnectionStatus`)
- Complete usage examples and patterns

## 📄 License

MIT © [Ali Akhgar](https://github.com/AliAkhgar)
