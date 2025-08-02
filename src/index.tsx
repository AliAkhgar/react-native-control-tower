import { useState, useCallback, useMemo, useEffect } from 'react';

// --- STORE FOR EXTERNAL ACCESS ---
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
export enum ConnectionStatus {
  DISCONNECTED = '0',
  DISCONNECTING = '1',
  CONNECTING = '2',
  CONNECTED = '3',
  INVALID = '-1',
  ERROR = '-2',
}

type VpnStatuses = Record<VpnType, ConnectionStatus>;

// Simple event system
const listeners = new Set<(statuses: VpnStatuses) => void>();

let _vpnStatuses: VpnStatuses = {
  OpenConnect: ConnectionStatus.DISCONNECTED,
  OpenVPN: ConnectionStatus.DISCONNECTED,
  Ikev2: ConnectionStatus.DISCONNECTED,
  WireGuard: ConnectionStatus.DISCONNECTED,
  L2TP: ConnectionStatus.DISCONNECTED,
  PPTP: ConnectionStatus.DISCONNECTED,
  SSTP: ConnectionStatus.DISCONNECTED,
  SoftEther: ConnectionStatus.DISCONNECTED,
  V2Ray: ConnectionStatus.DISCONNECTED,
  SSH: ConnectionStatus.DISCONNECTED,
  SingBox: ConnectionStatus.DISCONNECTED,
};

function notify() {
  for (const listener of listeners) {
    listener({ ..._vpnStatuses });
  }
}

// --- EXPOSED STORE API ---
export function updateVpnStatus(
  vpnType: VpnType,
  status: ConnectionStatus | any
) {
  _vpnStatuses = { ..._vpnStatuses, [vpnType]: status };
  notify();
}

export function getVpnStatuses(): VpnStatuses {
  return { ..._vpnStatuses };
}

const getKeyName = (enumValue: ConnectionStatus): string | undefined => {
  return Object.keys(ConnectionStatus).find(
    (key: any) =>
      ConnectionStatus[key as keyof typeof ConnectionStatus] == enumValue
  );
};

//create a function to get connectiton status outside the hook
export function getVpnConnectionStatus(): ConnectionStatus {
  const statuses = Object.values(getVpnStatuses());
  return statuses.includes(ConnectionStatus.CONNECTED)
    ? ConnectionStatus.CONNECTED
    : statuses.includes(ConnectionStatus.CONNECTING)
      ? ConnectionStatus.CONNECTING
      : ConnectionStatus.DISCONNECTED;
}
//create a function to get connection status title outside the hook
export function getVpnConnectionStatusTitle(): string | undefined {
  const statuses = Object.values(getVpnStatuses());
  return statuses.includes(ConnectionStatus.CONNECTED)
    ? getKeyName(ConnectionStatus.CONNECTED)
    : statuses.includes(ConnectionStatus.CONNECTING)
      ? getKeyName(ConnectionStatus.CONNECTING)
      : getKeyName(ConnectionStatus.DISCONNECTED);
}

// --- REACT HOOK ---
export function useVpnStatuses() {
  const [VPNStatuses, setVPNStatuses] = useState<VpnStatuses>(() =>
    getVpnStatuses()
  );

  const updateHandler = function (statuses: VpnStatuses) {
    setVPNStatuses(statuses);
  };
  useEffect(() => {
    listeners.add(updateHandler);
    return () => {
      listeners.delete(updateHandler);
    };
  }, []);

  const update = useCallback(updateVpnStatus, []);
  const get = useCallback(getVpnStatuses, []);

  const VPNStatus = useMemo(() => {
    return getVpnConnectionStatus();
  }, [VPNStatuses]);

  const VPNStatusTitle = useMemo(() => {
    return getVpnConnectionStatusTitle();
  }, [VPNStatuses]);

  return {
    VPNStatuses,
    VPNStatus,
    VPNStatusTitle,
    updateVpnStatus: update,
    getVpnStatuses: get,
  };
}
