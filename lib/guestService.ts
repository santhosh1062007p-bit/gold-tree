import { GuestRecord } from '@/types/guest';
import { allocateTreeAnchor } from './treeEngine';

const LOCAL_STORAGE_KEY = 'innovation_legacy_tree_guests_v1';

/**
 * Fetch all active guest records from MySQL database API or local cache
 */
export async function getAllGuests(): Promise<GuestRecord[]> {
  // Clear any legacy demo/test data stored in browser cache
  if (typeof window !== 'undefined' && !localStorage.getItem('ilt_v2_cleaned')) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.setItem('ilt_v2_cleaned', 'true');
  }

  try {
    const res = await fetch('/api/guests', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.guests) && data.guests.length > 0) {
        // Cache to localStorage for local fast backup
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.guests));
        }
        return data.guests;
      }
    }
  } catch (error) {
    console.warn('⚠️ MySQL API offline/unreachable. Loading from local store cache:', error);
  }

  // Fallback to local browser storage
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as GuestRecord[];
        return parsed.filter((g) => g.status === 'active');
      } catch (e) {
        console.error('Error parsing cached guests:', e);
      }
    }
  }

  return [];
}

/**
 * Create a new guest record and insert into MySQL database
 */
export async function createGuest(guestInput: {
  guestId: string;
  name: string;
  designation: string;
  organization: string;
  eventName: string;
  eventDate: string;
  base64Signature: string;
}): Promise<GuestRecord> {
  const existingGuests = await getAllGuests();

  // Allocate collision-free anchor on tree
  const allocatedAnchor = allocateTreeAnchor(existingGuests);

  const newGuest: GuestRecord = {
    guestId: guestInput.guestId,
    name: guestInput.name,
    designation: guestInput.designation,
    organization: guestInput.organization,
    eventName: guestInput.eventName,
    eventDate: guestInput.eventDate,
    timestamp: Date.now(),
    signatureUrl: guestInput.base64Signature,
    branchId: allocatedAnchor.branchId,
    anchorId: allocatedAnchor.anchorId,
    leafPosition: allocatedAnchor.leafPosition,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  // 1. Save to MySQL database via REST API
  try {
    const res = await fetch('/api/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest: newGuest })
    });
    if (res.ok) {
      console.log('✅ Guest record successfully saved to MySQL database legacy_tree_db.');
    }
  } catch (err) {
    console.warn('⚠️ MySQL API call failed. Record stored locally:', err);
  }

  // 2. Sync to localStorage
  if (typeof window !== 'undefined') {
    const updatedList = [...existingGuests, newGuest];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  }

  return newGuest;
}

/**
 * Delete a guest record from MySQL database
 */
export async function deleteGuest(guestId: string): Promise<boolean> {
  try {
    await fetch(`/api/guests?guestId=${encodeURIComponent(guestId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('⚠️ MySQL delete failed:', err);
  }

  if (typeof window !== 'undefined') {
    const currentList = await getAllGuests();
    const updatedList = currentList.filter((g) => g.guestId !== guestId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  }
  return true;
}

/**
 * Reset all tree guest data in MySQL database
 */
export async function resetAllGuests(): Promise<boolean> {
  try {
    await fetch('/api/guests?action=reset', { method: 'DELETE' });
  } catch (err) {
    console.warn('⚠️ MySQL reset failed:', err);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  }
  return true;
}
