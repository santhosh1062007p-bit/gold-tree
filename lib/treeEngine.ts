import { TreeAnchor, LeafPosition, GuestRecord } from '@/types/guest';
import { PREDEFINED_TREE_ANCHORS } from '@/data/treeAnchors';

export interface AllocatedAnchorResult {
  anchorId: string;
  branchId: string;
  leafPosition: LeafPosition;
}

/**
 * Calculates the next available tree anchor for a new guest, avoiding collisions with existing leaves.
 */
export function allocateTreeAnchor(existingGuests: GuestRecord[]): AllocatedAnchorResult {
  // Collect set of all currently occupied anchor IDs
  const occupiedAnchorIds = new Set(
    existingGuests
      .filter((g) => g.status === 'active' && g.anchorId)
      .map((g) => g.anchorId)
  );

  // 1. Get all available predefined anchors and pick one randomly to scatter leaves everywhere
  const availableAnchors = PREDEFINED_TREE_ANCHORS.filter(
    (anchor) => !occupiedAnchorIds.has(anchor.id)
  );

  const availableAnchor = availableAnchors.length > 0 
    ? availableAnchors[Math.floor(Math.random() * availableAnchors.length)] 
    : null;

  if (availableAnchor) {
    return {
      anchorId: availableAnchor.id,
      branchId: availableAnchor.branchId,
      leafPosition: {
        x: availableAnchor.x,
        y: availableAnchor.y,
        rotation: availableAnchor.rotation,
        scale: availableAnchor.scale
      }
    };
  }

  // 2. Procedural Fallback Expansion if all 120 predefined anchors are taken
  const extraIndex = existingGuests.length - PREDEFINED_TREE_ANCHORS.length;
  const parentAnchor = PREDEFINED_TREE_ANCHORS[extraIndex % PREDEFINED_TREE_ANCHORS.length];
  
  // Create a slight organic offset cluster around existing anchors
  const angle = (extraIndex * 137.5) * (Math.PI / 180); // Golden ratio angle dispersion
  const distanceRadius = 2.5 + Math.sin(extraIndex) * 1.5;

  const offsetX = Math.cos(angle) * distanceRadius;
  const offsetY = Math.sin(angle) * distanceRadius;

  const newX = Math.max(10, Math.min(90, parentAnchor.x + offsetX));
  const newY = Math.max(5, Math.min(60, parentAnchor.y + offsetY));

  return {
    anchorId: `procedural-anchor-${extraIndex + 1}`,
    branchId: parentAnchor.branchId,
    leafPosition: {
      x: Number(newX.toFixed(2)),
      y: Number(newY.toFixed(2)),
      rotation: parentAnchor.rotation + (extraIndex % 15 - 7),
      scale: Number((parentAnchor.scale * 0.9).toFixed(2))
    }
  };
}
