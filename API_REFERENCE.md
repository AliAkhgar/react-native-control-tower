# 📖 API Reference

## React Hooks

### `useVpnStatuses()`

A React hook that provides reactive access to VPN status management.

**Returns:** An object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `VPNStatuses` | `Record<VpnType, ConnectionStatus>` | Object containing all VPN protocol statuses |
| `VPNStatus` | `ConnectionStatus` | Overall connection status across all protocols |
| `VPNStatusTitle` | `string \| undefined` | Human-readable status title |
| `connectedVpnType` | `VpnType \| undefined` | Currently connected VPN protocol |
| `updateVpnStatus` | `Function` | Function to update VPN status |
| `getVpnStatuses` | `Function` | Function to get all VPN statuses |

**Example:**
```javascript
const { 
  VPNStatuses, 
  VPNStatus, 
  VPNStatusTitle, 
  connectedVpnType, 
  updateVpnStatus, 
  getVpnStatuses 
} = useVpnStatuses();
```

## Standalone Functions

### `updateVpnStatus(vpnType, status)`

Updates the status of a specific VPN protocol.

**Parameters:**
- `vpnType`: `VpnType` - The VPN protocol type
- `status`: `ConnectionStatus` - The new connection status

**Returns:** `void`

**Example:**
```javascript
updateVpnStatus('WireGuard', ConnectionStatus.CONNECTED);
```

### `getVpnStatuses()`

Retrieves all VPN protocol statuses as an object.

**Parameters:** None

**Returns:** `Record<VpnType, ConnectionStatus>` - Object mapping each VPN type to its current status

**Example:**
```javascript
const allStatuses = getVpnStatuses();
console.log(allStatuses.WireGuard); // '3' for connected
```

### `getVpnConnectionStatus()`

Gets the overall connection status across all VPN protocols. Returns the highest priority status (Connected > Connecting > Disconnected).

**Parameters:** None

**Returns:** `ConnectionStatus` - Overall connection status

**Example:**
```javascript
const overallStatus = getVpnConnectionStatus();
console.log(overallStatus); // '3' if any VPN is connected
```

### `getVpnConnectionStatusTitle()`

Gets the human-readable title for the current overall connection status.

**Parameters:** None

**Returns:** `string | undefined` - Human-readable status title

**Example:**
```javascript
const statusTitle = getVpnConnectionStatusTitle();
console.log(statusTitle); // 'CONNECTED', 'CONNECTING', 'DISCONNECTED'
```

### `getConnectedVpnType()`

Gets the currently connected VPN protocol type. Returns the first VPN type that has a CONNECTED status.

**Parameters:** None

**Returns:** `VpnType | undefined` - The connected VPN protocol, or undefined if none are connected

**Example:**
```javascript
const activeVPN = getConnectedVpnType();
console.log(activeVPN); // 'WireGuard' or undefined
```

## TypeScript Types

### `VpnType`

Defines the supported VPN protocol types.

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

### `ConnectionStatus`

Enumeration of possible connection states.

```typescript
enum ConnectionStatus {
  DISCONNECTED = '0',   // Not connected
  DISCONNECTING = '1',  // Currently disconnecting
  CONNECTING = '2',     // Currently connecting
  CONNECTED = '3',      // Successfully connected
  INVALID = '-1',       // Invalid state
  ERROR = '-2',         // Error occurred
}
```

### `VpnStatuses`

Type representing the status mapping for all VPN protocols.

```typescript
type VpnStatuses = Record<VpnType, ConnectionStatus>;
```

## Status Priority Logic

When multiple VPN protocols have different statuses, the overall status follows this priority:

1. **CONNECTED** - If any VPN is connected
2. **CONNECTING** - If any VPN is connecting (and none are connected)
3. **DISCONNECTED** - If all VPNs are disconnected
4. **DISCONNECTING** - During disconnection process
5. **ERROR** - If an error occurred
6. **INVALID** - Invalid state

## Usage Patterns

### React Component Integration

```javascript
import React from 'react';
import { useVpnStatuses } from '@aliakhgar1/react-native-control-tower';

function VPNComponent() {
  const { VPNStatusTitle, connectedVpnType, updateVpnStatus } = useVpnStatuses();
  
  return (
    <div>
      <p>Status: {VPNStatusTitle}</p>
      <p>Active VPN: {connectedVpnType || 'None'}</p>
    </div>
  );
}
```

### Non-React Usage

```javascript
import * as ControlTower from '@aliakhgar1/react-native-control-tower';

// Update status
ControlTower.updateVpnStatus('OpenVPN', ControlTower.ConnectionStatus.CONNECTED);

// Check status
const status = ControlTower.getVpnConnectionStatus();
const title = ControlTower.getVpnConnectionStatusTitle();
const activeVPN = ControlTower.getConnectedVpnType();
```

### Event-Driven Updates

The library uses an internal event system. When you call `updateVpnStatus()`, all React components using `useVpnStatuses()` will automatically re-render with the updated status.

```javascript
// This will trigger re-renders in all components using useVpnStatuses()
updateVpnStatus('WireGuard', ConnectionStatus.CONNECTED);
```