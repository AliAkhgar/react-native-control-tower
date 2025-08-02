# react-native-control-tower

A React Native library for managing VPN connection states across multiple protocols. Control Tower holds the latest states of multiple VPN protocols and provides real-time updates about connection status, which protocol is connected, and the current state.

## Features

- 🔄 **Real-time VPN state management** - Track connection states across multiple protocols
- 🪝 **React Hook support** - Easy integration with React components
- 🔌 **Standalone functions** - Use without hooks for non-React contexts
- 📡 **Multiple protocols** - Support for 11+ VPN protocols
- ⚡ **Reactive** - Automatic updates when VPN states change

## Installation

```sh
npm install @aliakhgar1/react-native-control-tower
```

## Supported VPN Protocols

- OpenConnect
- OpenVPN
- Ikev2
- WireGuard
- L2TP
- PPTP
- SSTP
- SoftEther
- V2Ray
- SSH
- SingBox

## Getting Started

### Using the React Hook

The easiest way to use Control Tower is with the `useVpnStatuses` hook:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function VPNStatus() {
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

### Updating VPN Status

#### Automatic Updates with Listeners

For reactive updates, use listeners from your VPN libraries:

```tsx
import { WireGuard } from 'react-native-wireguard'; // Example
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Set up automatic listener for WireGuard state changes
const WGSub = WireGuard.addWireguardStateChangeListener((WGState) => {
  ControlTower.updateVpnStatus('WireGuard', WGState?.state);
});

// Don't forget to clean up
// WGSub.remove();
```

#### Manual State Updates

You can also manually get and update VPN states:

```tsx
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

const getCurrentState = async () => {
  try {
    // Get current state from your VPN library
    const state = await WireGuard.getCurrentState();
    
    // Update Control Tower
    ControlTower.updateVpnStatus('WireGuard', state);
  } catch (e) {
    console.error('Error getting VPN state:', e);
  }
};
```

### Using Without Hooks

For non-React contexts or when you need standalone functions:

```tsx
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Get current connection status
const connectionStatus = ControlTower.getVpnConnectionStatus();

// Get connection status as readable string
const statusTitle = ControlTower.getVpnConnectionStatusTitle();

// Get which VPN type is currently connected
const connectedType = ControlTower.getConnectedVpnType();

// Get all VPN statuses
const allStatuses = ControlTower.getVpnStatuses();
```

## Connection Status

Control Tower uses the following connection states:

```tsx
enum ConnectionStatus {
  DISCONNECTED = '0',  // VPN is disconnected
  DISCONNECTING = '1', // VPN is in the process of disconnecting
  CONNECTING = '2',    // VPN is in the process of connecting
  CONNECTED = '3',     // VPN is connected
  INVALID = '-1',      // Invalid state
  ERROR = '-2',        // Error occurred
}
```

## API Reference

### Hook

#### `useVpnStatuses()`

Returns an object with:

- `VPNStatuses` - Object containing all VPN protocol states
- `VPNStatus` - Current overall connection status (ConnectionStatus enum)
- `VPNStatusTitle` - Human-readable status string
- `connectedVpnType` - The VPN protocol that's currently connected
- `updateVpnStatus` - Function to update a specific VPN's status
- `getVpnStatuses` - Function to get all current statuses

### Standalone Functions

#### `updateVpnStatus(vpnType, status)`

Update the status of a specific VPN protocol.

- `vpnType`: One of the supported VPN protocol strings
- `status`: ConnectionStatus enum value

#### `getVpnStatuses()`

Returns object with all VPN protocol statuses.

#### `getVpnConnectionStatus()`

Returns the overall connection status (ConnectionStatus enum).

#### `getVpnConnectionStatusTitle()`

Returns human-readable connection status string.

#### `getConnectedVpnType()`

Returns the VPN protocol that's currently connected, or undefined if none.

## Example Integration

Here's a complete example with WireGuard:

```tsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { WireGuard } from 'react-native-wireguard';
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

function VPNControlPanel() {
  const { VPNStatusTitle, connectedVpnType, VPNStatus } =
    ControlTower.useVpnStatuses();

  useEffect(() => {
    // Set up automatic state listener
    const subscription = WireGuard.addWireguardStateChangeListener((state) => {
      ControlTower.updateVpnStatus('WireGuard', state?.state);
    });

    // Get initial state
    getCurrentState();

    return () => subscription.remove();
  }, []);

  const getCurrentState = async () => {
    try {
      const state = await WireGuard.getCurrentState();
      ControlTower.updateVpnStatus('WireGuard', state);
    } catch (e) {
      Alert.alert('Error', 'Failed to get VPN state: ' + e?.toString());
    }
  };

  const isConnected = VPNStatus === ControlTower.ConnectionStatus.CONNECTED;

  return (
    <View style={{ padding: 20 }}>
      <Text>VPN Status: {VPNStatusTitle}</Text>
      <Text>Connected Protocol: {connectedVpnType || 'None'}</Text>
      <Text>Is Connected: {isConnected ? 'Yes' : 'No'}</Text>
      
      <Button
        title="Refresh Status"
        onPress={getCurrentState}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
