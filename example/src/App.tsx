import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as ControlTower from 'react-native-control-tower';

export default function App() {
  const { VPNStatusTitle, updateVpnStatus, connectedVpnType, VPNStatus } =
    ControlTower.useVpnStatuses();

  // Simulate VPN state changes for demo purposes
  const simulateWireGuardConnection = () => {
    updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTING);
    
    setTimeout(() => {
      updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTED);
    }, 2000);
  };

  const simulateWireGuardDisconnection = () => {
    updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.DISCONNECTING);
    
    setTimeout(() => {
      updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.DISCONNECTED);
    }, 1500);
  };

  const simulateOpenVPNConnection = () => {
    updateVpnStatus('OpenVPN', ControlTower.ConnectionStatus.CONNECTING);
    
    setTimeout(() => {
      updateVpnStatus('OpenVPN', ControlTower.ConnectionStatus.CONNECTED);
    }, 2500);
  };

  const showCurrentState = () => {
    const status = ControlTower.getVpnConnectionStatus();
    const statusTitle = ControlTower.getVpnConnectionStatusTitle();
    const connectedType = ControlTower.getConnectedVpnType();
    
    Alert.alert(
      'Current VPN State',
      `Status: ${statusTitle}\nConnected VPN: ${connectedType || 'None'}\nStatus Code: ${status}`
    );
  };

  const isConnected = VPNStatus === ControlTower.ConnectionStatus.CONNECTED;
  const isConnecting = VPNStatus === ControlTower.ConnectionStatus.CONNECTING;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VPN Control Tower Demo</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Current Status:</Text>
        <Text style={[styles.statusValue, isConnected ? styles.connected : styles.disconnected]}>
          {VPNStatusTitle}
        </Text>
        
        <Text style={styles.statusLabel}>Connected VPN:</Text>
        <Text style={styles.statusValue}>
          {connectedVpnType || 'None'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Connect WireGuard"
          onPress={simulateWireGuardConnection}
          disabled={isConnecting}
        />
        
        <Button
          title="Disconnect WireGuard"
          onPress={simulateWireGuardDisconnection}
          disabled={isConnecting}
        />
        
        <Button
          title="Connect OpenVPN"
          onPress={simulateOpenVPNConnection}
          disabled={isConnecting}
        />
        
        <Button
          title="Show Current State"
          onPress={showCurrentState}
        />
      </View>

      <Text style={styles.note}>
        This demo shows how Control Tower manages VPN states across multiple protocols.
        In a real app, you would connect this to actual VPN libraries.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  connected: {
    color: '#4CAF50',
  },
  disconnected: {
    color: '#F44336',
  },
  buttonContainer: {
    gap: 15,
    minWidth: 200,
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});
