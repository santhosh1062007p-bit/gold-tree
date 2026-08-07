import { TreeAnchor } from '@/types/guest';

// Predefined 120 geometric anchor positions on tree branches
// Coordinates are specified as percentages (0 to 100) relative to the tree container
export const PREDEFINED_TREE_ANCHORS: TreeAnchor[] = [
  // Left Lower Branch Cluster (branch-left-01)
  { id: 'leaf-anchor-001', x: 28, y: 52, rotation: -45, scale: 0.95, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-002', x: 24, y: 50, rotation: -50, scale: 0.9, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-003', x: 20, y: 48, rotation: -55, scale: 0.85, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-004', x: 26, y: 46, rotation: -35, scale: 0.9, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-005', x: 22, y: 44, rotation: -40, scale: 0.85, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-006', x: 18, y: 42, rotation: -60, scale: 0.8, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-007', x: 30, y: 48, rotation: -30, scale: 1.0, branchId: 'branch-left-01' },
  { id: 'leaf-anchor-008', x: 15, y: 40, rotation: -65, scale: 0.8, branchId: 'branch-left-01' },

  // Left Mid Branch Cluster (branch-left-02)
  { id: 'leaf-anchor-009', x: 32, y: 38, rotation: -25, scale: 0.95, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-010', x: 27, y: 36, rotation: -35, scale: 0.9, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-011', x: 22, y: 34, rotation: -45, scale: 0.85, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-012', x: 17, y: 32, rotation: -50, scale: 0.8, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-013', x: 30, y: 32, rotation: -20, scale: 0.9, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-014', x: 25, y: 30, rotation: -30, scale: 0.85, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-015', x: 20, y: 28, rotation: -40, scale: 0.8, branchId: 'branch-left-02' },
  { id: 'leaf-anchor-016', x: 14, y: 26, rotation: -55, scale: 0.75, branchId: 'branch-left-02' },

  // Left High Branch Cluster (branch-left-03)
  { id: 'leaf-anchor-017', x: 36, y: 26, rotation: -15, scale: 0.95, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-018', x: 31, y: 24, rotation: -25, scale: 0.9, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-019', x: 26, y: 22, rotation: -35, scale: 0.85, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-020', x: 21, y: 20, rotation: -45, scale: 0.8, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-021', x: 34, y: 20, rotation: -10, scale: 0.9, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-022', x: 29, y: 18, rotation: -20, scale: 0.85, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-023', x: 24, y: 16, rotation: -30, scale: 0.8, branchId: 'branch-left-03' },
  { id: 'leaf-anchor-024', x: 18, y: 14, rotation: -40, scale: 0.75, branchId: 'branch-left-03' },

  // Top Left Canopy Cluster (branch-top-left)
  { id: 'leaf-anchor-025', x: 38, y: 16, rotation: -10, scale: 0.9, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-026', x: 33, y: 14, rotation: -20, scale: 0.85, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-027', x: 28, y: 12, rotation: -30, scale: 0.8, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-028', x: 23, y: 10, rotation: -35, scale: 0.75, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-029', x: 41, y: 12, rotation: -5, scale: 0.95, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-030', x: 36, y: 10, rotation: -15, scale: 0.9, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-031', x: 31, y: 8, rotation: -25, scale: 0.85, branchId: 'branch-top-left' },
  { id: 'leaf-anchor-032', x: 26, y: 6, rotation: -30, scale: 0.8, branchId: 'branch-top-left' },

  // Top Center Canopy (branch-top-center)
  { id: 'leaf-anchor-033', x: 44, y: 12, rotation: -5, scale: 1.0, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-034', x: 47, y: 10, rotation: 0, scale: 1.0, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-035', x: 50, y: 9, rotation: 0, scale: 1.05, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-036', x: 53, y: 10, rotation: 5, scale: 1.0, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-037', x: 56, y: 12, rotation: 10, scale: 1.0, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-038', x: 42, y: 8, rotation: -10, scale: 0.9, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-039', x: 46, y: 6, rotation: -5, scale: 0.85, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-040', x: 50, y: 5, rotation: 0, scale: 0.9, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-041', x: 54, y: 6, rotation: 5, scale: 0.85, branchId: 'branch-top-center' },
  { id: 'leaf-anchor-042', x: 58, y: 8, rotation: 10, scale: 0.9, branchId: 'branch-top-center' },

  // Top Right Canopy Cluster (branch-top-right)
  { id: 'leaf-anchor-043', x: 62, y: 16, rotation: 10, scale: 0.9, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-044', x: 67, y: 14, rotation: 20, scale: 0.85, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-045', x: 72, y: 12, rotation: 30, scale: 0.8, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-046', x: 77, y: 10, rotation: 35, scale: 0.75, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-047', x: 59, y: 12, rotation: 5, scale: 0.95, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-048', x: 64, y: 10, rotation: 15, scale: 0.9, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-049', x: 69, y: 8, rotation: 25, scale: 0.85, branchId: 'branch-top-right' },
  { id: 'leaf-anchor-050', x: 74, y: 6, rotation: 30, scale: 0.8, branchId: 'branch-top-right' },

  // Right High Branch Cluster (branch-right-03)
  { id: 'leaf-anchor-051', x: 64, y: 26, rotation: 15, scale: 0.95, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-052', x: 69, y: 24, rotation: 25, scale: 0.9, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-053', x: 74, y: 22, rotation: 35, scale: 0.85, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-054', x: 79, y: 20, rotation: 45, scale: 0.8, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-055', x: 66, y: 20, rotation: 10, scale: 0.9, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-056', x: 71, y: 18, rotation: 20, scale: 0.85, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-057', x: 76, y: 16, rotation: 30, scale: 0.8, branchId: 'branch-right-03' },
  { id: 'leaf-anchor-058', x: 82, y: 14, rotation: 40, scale: 0.75, branchId: 'branch-right-03' },

  // Right Mid Branch Cluster (branch-right-02)
  { id: 'leaf-anchor-059', x: 68, y: 38, rotation: 25, scale: 0.95, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-060', x: 73, y: 36, rotation: 35, scale: 0.9, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-061', x: 78, y: 34, rotation: 45, scale: 0.85, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-062', x: 83, y: 32, rotation: 50, scale: 0.8, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-063', x: 70, y: 32, rotation: 20, scale: 0.9, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-064', x: 75, y: 30, rotation: 30, scale: 0.85, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-065', x: 80, y: 28, rotation: 40, scale: 0.8, branchId: 'branch-right-02' },
  { id: 'leaf-anchor-066', x: 86, y: 26, rotation: 55, scale: 0.75, branchId: 'branch-right-02' },

  // Right Lower Branch Cluster (branch-right-01)
  { id: 'leaf-anchor-067', x: 72, y: 52, rotation: 45, scale: 0.95, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-068', x: 76, y: 50, rotation: 50, scale: 0.9, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-069', x: 80, y: 48, rotation: 55, scale: 0.85, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-070', x: 74, y: 46, rotation: 35, scale: 0.9, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-071', x: 78, y: 44, rotation: 40, scale: 0.85, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-072', x: 82, y: 42, rotation: 60, scale: 0.8, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-073', x: 70, y: 48, rotation: 30, scale: 1.0, branchId: 'branch-right-01' },
  { id: 'leaf-anchor-074', x: 85, y: 40, rotation: 65, scale: 0.8, branchId: 'branch-right-01' },

  // Inner Central Sub-Branches
  { id: 'leaf-anchor-075', x: 40, y: 32, rotation: -12, scale: 0.9, branchId: 'branch-center-left' },
  { id: 'leaf-anchor-076', x: 43, y: 28, rotation: -15, scale: 0.85, branchId: 'branch-center-left' },
  { id: 'leaf-anchor-077', x: 45, y: 24, rotation: -8, scale: 0.95, branchId: 'branch-center-left' },
  { id: 'leaf-anchor-078', x: 38, y: 24, rotation: -20, scale: 0.85, branchId: 'branch-center-left' },
  { id: 'leaf-anchor-079', x: 60, y: 32, rotation: 12, scale: 0.9, branchId: 'branch-center-right' },
  { id: 'leaf-anchor-080', x: 57, y: 28, rotation: 15, scale: 0.85, branchId: 'branch-center-right' },
  { id: 'leaf-anchor-081', x: 55, y: 24, rotation: 8, scale: 0.95, branchId: 'branch-center-right' },
  { id: 'leaf-anchor-082', x: 62, y: 24, rotation: 20, scale: 0.85, branchId: 'branch-center-right' },

  // Deep Sub-Canopy Fillers
  { id: 'leaf-anchor-083', x: 35, y: 42, rotation: -22, scale: 0.95, branchId: 'branch-inner-left-1' },
  { id: 'leaf-anchor-084', x: 38, y: 46, rotation: -28, scale: 0.9, branchId: 'branch-inner-left-1' },
  { id: 'leaf-anchor-085', x: 42, y: 40, rotation: -14, scale: 0.95, branchId: 'branch-inner-left-2' },
  { id: 'leaf-anchor-086', x: 45, y: 36, rotation: -10, scale: 0.9, branchId: 'branch-inner-left-2' },
  { id: 'leaf-anchor-087', x: 65, y: 42, rotation: 22, scale: 0.95, branchId: 'branch-inner-right-1' },
  { id: 'leaf-anchor-088', x: 62, y: 46, rotation: 28, scale: 0.9, branchId: 'branch-inner-right-1' },
  { id: 'leaf-anchor-089', x: 58, y: 40, rotation: 14, scale: 0.95, branchId: 'branch-inner-right-2' },
  { id: 'leaf-anchor-090', x: 55, y: 36, rotation: 10, scale: 0.9, branchId: 'branch-inner-right-2' },

  // Outer Edge Extensions
  { id: 'leaf-anchor-091', x: 12, y: 38, rotation: -65, scale: 0.75, branchId: 'branch-edge-left' },
  { id: 'leaf-anchor-092', x: 14, y: 48, rotation: -60, scale: 0.75, branchId: 'branch-edge-left' },
  { id: 'leaf-anchor-093', x: 16, y: 18, rotation: -50, scale: 0.75, branchId: 'branch-edge-left' },
  { id: 'leaf-anchor-094', x: 88, y: 38, rotation: 65, scale: 0.75, branchId: 'branch-edge-right' },
  { id: 'leaf-anchor-095', x: 86, y: 48, rotation: 60, scale: 0.75, branchId: 'branch-edge-right' },
  { id: 'leaf-anchor-096', x: 84, y: 18, rotation: 50, scale: 0.75, branchId: 'branch-edge-right' },

  // Top Spire Clusters
  { id: 'leaf-anchor-097', x: 48, y: 4, rotation: -3, scale: 0.85, branchId: 'branch-top-spire' },
  { id: 'leaf-anchor-098', x: 52, y: 4, rotation: 3, scale: 0.85, branchId: 'branch-top-spire' },
  { id: 'leaf-anchor-099', x: 50, y: 3, rotation: 0, scale: 0.9, branchId: 'branch-top-spire' },
  { id: 'leaf-anchor-100', x: 45, y: 4, rotation: -8, scale: 0.8, branchId: 'branch-top-spire' },
  { id: 'leaf-anchor-101', x: 55, y: 4, rotation: 8, scale: 0.8, branchId: 'branch-top-spire' },

  // Secondary Canopy Layers (102 to 120)
  { id: 'leaf-anchor-102', x: 34, y: 22, rotation: -18, scale: 0.88, branchId: 'branch-layer2-left' },
  { id: 'leaf-anchor-103', x: 29, y: 28, rotation: -26, scale: 0.86, branchId: 'branch-layer2-left' },
  { id: 'leaf-anchor-104', x: 25, y: 38, rotation: -38, scale: 0.88, branchId: 'branch-layer2-left' },
  { id: 'leaf-anchor-105', x: 21, y: 44, rotation: -48, scale: 0.82, branchId: 'branch-layer2-left' },
  { id: 'leaf-anchor-106', x: 66, y: 22, rotation: 18, scale: 0.88, branchId: 'branch-layer2-right' },
  { id: 'leaf-anchor-107', x: 71, y: 28, rotation: 26, scale: 0.86, branchId: 'branch-layer2-right' },
  { id: 'leaf-anchor-108', x: 75, y: 38, rotation: 38, scale: 0.88, branchId: 'branch-layer2-right' },
  { id: 'leaf-anchor-109', x: 79, y: 44, rotation: 48, scale: 0.82, branchId: 'branch-layer2-right' },
  { id: 'leaf-anchor-110', x: 41, y: 18, rotation: -8, scale: 0.92, branchId: 'branch-layer2-mid' },
  { id: 'leaf-anchor-111', x: 47, y: 16, rotation: -2, scale: 0.94, branchId: 'branch-layer2-mid' },
  { id: 'leaf-anchor-112', x: 53, y: 16, rotation: 2, scale: 0.94, branchId: 'branch-layer2-mid' },
  { id: 'leaf-anchor-113', x: 59, y: 18, rotation: 8, scale: 0.92, branchId: 'branch-layer2-mid' },
  { id: 'leaf-anchor-114', x: 37, y: 30, rotation: -20, scale: 0.88, branchId: 'branch-layer3-left' },
  { id: 'leaf-anchor-115', x: 42, y: 26, rotation: -12, scale: 0.90, branchId: 'branch-layer3-left' },
  { id: 'leaf-anchor-116', x: 58, y: 26, rotation: 12, scale: 0.90, branchId: 'branch-layer3-right' },
  { id: 'leaf-anchor-117', x: 63, y: 30, rotation: 20, scale: 0.88, branchId: 'branch-layer3-right' },
  { id: 'leaf-anchor-118', x: 49, y: 20, rotation: 0, scale: 0.96, branchId: 'branch-layer3-center' },
  { id: 'leaf-anchor-119', x: 51, y: 20, rotation: 0, scale: 0.96, branchId: 'branch-layer3-center' },
  { id: 'leaf-anchor-120', x: 50, y: 14, rotation: 0, scale: 1.0, branchId: 'branch-layer3-center' },
];
