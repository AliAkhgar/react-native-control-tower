import { Text, View, StyleSheet, Button } from 'react-native';
import * as ControlTower from 'react-native-control-tower';

export default function App() {
  const { VPNStatusTitle, updateVpnStatus, connectedVpnType, VPNStatuses } =
    ControlTower.useVpnStatuses();

  const connectWireGuard = () => {
    updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTING);
    setTimeout(() => {
      updateVpnStatus('WireGuard', ControlTower.ConnectionStatus.CONNECTED);
    }, 1000);
  };

  const disconnectAll = () => {
    Object.keys(VPNStatuses).forEach((vpnType) => {
      updateVpnStatus(
        vpnType as any,
        ControlTower.ConnectionStatus.DISCONNECTED
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗼 VPN Control Tower</Text>
      <Text style={styles.status}>Status: {VPNStatusTitle}</Text>
      {connectedVpnType && (
        <Text style={styles.connectedVpn}>Connected: {connectedVpnType}</Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button title="Connect WireGuard" onPress={connectWireGuard} />
        <Button title="Disconnect All" onPress={disconnectAll} />
      </View>

      <View style={styles.statusList}>
        <Text style={styles.statusListTitle}>All VPN Statuses:</Text>
        {Object.entries(VPNStatuses).map(([vpnType, status]) => (
          <Text key={vpnType} style={styles.statusItem}>
            {vpnType}: {status === '3' ? '🟢' : status === '2' ? '🟡' : '🔴'}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  connectedVpn: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  statusList: {
    alignItems: 'center',
  },
  statusListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusItem: {
    fontSize: 14,
    marginVertical: 2,
  },
});
