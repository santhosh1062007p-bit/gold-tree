export type KioskStep = 
  | 'WELCOME'
  | 'REGISTRATION'
  | 'SIGNATURE'
  | 'TRANSFORMATION'
  | 'THANK_YOU'
  | 'TREE_VIEW';

export interface LeafPosition {
  x: number;       // Percentage X position on tree canvas (0 to 100)
  y: number;       // Percentage Y position on tree canvas (0 to 100)
  rotation: number; // Angle in degrees (-180 to 180)
  scale: number;    // Visual scaling factor (e.g. 0.8 to 1.2)
}

export interface TreeAnchor {
  id: string;      // e.g. "leaf-anchor-001"
  x: number;       // Percentage X (0 to 100)
  y: number;       // Percentage Y (0 to 100)
  rotation: number;
  scale: number;
  branchId: string; // e.g. "branch-left-01"
}

export interface GuestRecord {
  guestId: string;         // Unique ID e.g., "ILT-2026-0001"
  name: string;
  designation: string;
  organization: string;
  eventName: string;
  eventDate: string;       // YYYY-MM-DD
  timestamp: number;       // Date.now() unix ms
  signatureUrl: string;    // Base64 PNG signature stroke
  branchId: string;
  anchorId: string;
  leafPosition: LeafPosition;
  status: 'active' | 'archived';
  createdAt: string;       // ISO string
}

export interface SignatureStrokePoint {
  x: number;
  y: number;
  time: number;
}

export interface AdminStats {
  totalGuests: number;
  totalEvents: number;
  occupiedAnchors: number;
  availableAnchors: number;
  latestGuestName?: string;
  latestEventName?: string;
}

export interface AudioSettings {
  muted: boolean;
  volume: number; // 0.0 to 1.0
}
