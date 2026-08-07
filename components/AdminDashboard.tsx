'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lock, Search, Trash2, Download, RefreshCw, Eye, X, 
  Users, Calendar, Award, ShieldAlert, LogOut, ArrowLeft 
} from 'lucide-react';
import { GuestRecord, AdminStats } from '@/types/guest';
import { getAllGuests, deleteGuest, resetAllGuests } from '@/lib/guestService';
import { PREDEFINED_TREE_ANCHORS } from '@/data/treeAnchors';
import { formatDate } from '@/lib/utils';
import { soundSystem } from '@/lib/soundSystem';

const SESSION_KEY = 'ilt_admin_auth';
const ADMIN_PASSWORD = 'samy';

interface AdminDashboardProps {
  onBackToKiosk: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToKiosk }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [guests, setGuests] = useState<GuestRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('ALL');
  const [selectedSignature, setSelectedSignature] = useState<{ name: string; url: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Persist auth in sessionStorage so page reload doesn't log out
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadData = async () => {
    const data = await getAllGuests();
    setGuests(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundSystem.playClick();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError('');
      setPassword('');
    } else {
      setAuthError('Incorrect Admin Password. Please try again.');
      setPassword('');
    }
  };

  const handleLock = () => {
    soundSystem.playClick();
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
  };

  const handleDelete = async (guestId: string) => {
    if (window.confirm(`Delete guest record ${guestId}? This cannot be undone.`)) {
      soundSystem.playClick();
      setIsDeleting(guestId);
      await deleteGuest(guestId);
      await loadData();
      setIsDeleting(null);
    }
  };

  const handleReset = async () => {
    if (window.confirm('CRITICAL: Reset will permanently clear ALL guest records and golden leaves. Continue?')) {
      if (window.confirm('FINAL CONFIRMATION: This will erase ALL tree data permanently. Proceed?')) {
        soundSystem.playClick();
        setIsResetting(true);
        await resetAllGuests();
        await loadData();
        setIsResetting(false);
      }
    }
  };

  const exportCSV = () => {
    soundSystem.playClick();
    if (guests.length === 0) return;

    const headers = ['Guest ID', 'Name', 'Designation', 'Organization', 'Event Name', 'Date', 'Branch ID', 'Anchor ID', 'Created At'];
    const rows = guests.map(g => [
      `"${g.guestId}"`,
      `"${g.name}"`,
      `"${g.designation}"`,
      `"${g.organization}"`,
      `"${g.eventName}"`,
      `"${g.eventDate}"`,
      `"${g.branchId}"`,
      `"${g.anchorId}"`,
      `"${g.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `legacy_tree_guests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Guests
  const filteredGuests = guests.filter(g => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.guestId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = eventFilter === 'ALL' || g.eventName === eventFilter;
    return matchesSearch && matchesEvent;
  });

  const uniqueEvents = Array.from(new Set(guests.map(g => g.eventName)));

  const stats: AdminStats = {
    totalGuests: guests.length,
    totalEvents: uniqueEvents.length,
    occupiedAnchors: guests.length,
    availableAnchors: Math.max(0, PREDEFINED_TREE_ANCHORS.length - guests.length),
    latestGuestName: guests.length > 0 ? guests[guests.length - 1].name : 'None yet',
  };

  // ─── PASSWORD LOCK SCREEN ─────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#07090E] flex items-center justify-center p-6 select-none">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 space-y-6 text-center border border-amber-500/30 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="p-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
              <Lock className="w-10 h-10" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold gold-gradient-text">ADMIN PORTAL ACCESS</h2>
            <p className="text-xs text-amber-200/60 mt-2">
              Enter the master password to manage institutional heritage records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder="Enter admin password..."
                autoFocus
                className="w-full bg-[#0A0E17] text-amber-100 text-center px-4 py-4 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-lg tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/50 hover:text-amber-300 text-xs"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {authError && (
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-red-950/40 border border-red-500/30 rounded-xl">
                <p className="text-sm text-red-400 font-medium">{authError}</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onBackToKiosk}
                type="button"
                className="w-1/3 py-3.5 rounded-xl border border-amber-500/30 text-amber-300 text-sm font-semibold hover:bg-amber-500/10 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Kiosk
              </button>
              <button
                type="submit"
                disabled={!password}
                className="gold-glow-btn w-2/3 py-3.5 rounded-xl text-amber-100 font-bold text-sm tracking-wider uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                AUTHENTICATE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ──────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen bg-[#07090E] select-none">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Master Administration Console</span>
            </div>
            <h1 className="text-3xl font-extrabold gold-gradient-text mt-1">INNOVATION LEGACY ARCHIVE</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { soundSystem.playClick(); loadData(); }}
              type="button"
              title="Refresh data"
              className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToKiosk}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold hover:bg-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Kiosk</span>
            </button>
            <button
              onClick={handleLock}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm font-semibold hover:bg-red-900/60 transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs uppercase tracking-wider font-semibold">Total Guests</span>
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-amber-100">{stats.totalGuests}</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs uppercase tracking-wider font-semibold">Active Events</span>
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-amber-100">{stats.totalEvents}</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs uppercase tracking-wider font-semibold">Occupied Anchors</span>
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-amber-100">
              {stats.occupiedAnchors}
              <span className="text-xs font-normal text-amber-400/60"> / {PREDEFINED_TREE_ANCHORS.length}</span>
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs uppercase tracking-wider font-semibold">Latest Chief Guest</span>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-lg font-semibold text-amber-100 truncate">{stats.latestGuestName}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-panel rounded-2xl p-4 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, org, ID..."
              className="w-full bg-[#0A0E17] text-amber-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="w-full md:w-auto flex items-center gap-3 flex-wrap">
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="bg-[#0A0E17] text-amber-200 text-sm px-4 py-2.5 rounded-xl border border-amber-500/30 focus:outline-none"
            >
              <option value="ALL">All Events ({guests.length})</option>
              {uniqueEvents.map((evt) => (
                <option key={evt} value={evt}>{evt}</option>
              ))}
            </select>

            <button
              onClick={exportCSV}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-sm font-semibold hover:bg-amber-500/30 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isResetting || guests.length === 0}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-semibold hover:bg-red-900/80 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-40"
            >
              <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset Tree</span>
            </button>
          </div>
        </div>

        {/* Guest Data Table */}
        <div className="glass-panel rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-amber-100">
              <thead className="bg-[#0A0E17]/90 text-amber-400 uppercase text-xs tracking-wider border-b border-amber-500/20">
                <tr>
                  <th className="px-5 py-4">Guest ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Designation</th>
                  <th className="px-5 py-4">Organization</th>
                  <th className="px-5 py-4">Event & Date</th>
                  <th className="px-5 py-4">Anchor</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-amber-400/50 italic">
                      {guests.length === 0 ? 'No guest records yet. The tree awaits its first legacy.' : 'No records match your search.'}
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((g) => (
                    <tr key={g.guestId} className="hover:bg-amber-500/5 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-amber-400">{g.guestId}</td>
                      <td className="px-5 py-4 font-semibold text-amber-100 whitespace-nowrap">{g.name}</td>
                      <td className="px-5 py-4 text-amber-200/80">{g.designation}</td>
                      <td className="px-5 py-4 text-amber-200/80">{g.organization}</td>
                      <td className="px-5 py-4 text-xs text-amber-300/70">
                        <div className="whitespace-nowrap">{g.eventName}</div>
                        <div className="font-mono text-amber-400/50">{formatDate(g.eventDate)}</div>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-amber-400/70">{g.anchorId}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {g.signatureUrl && (
                            <button
                              onClick={() => {
                                soundSystem.playClick('tab');
                                setSelectedSignature({ name: g.name, url: g.signatureUrl });
                              }}
                              type="button"
                              className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer"
                              title="Preview Signature"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(g.guestId)}
                            disabled={isDeleting === g.guestId}
                            type="button"
                            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer disabled:opacity-30"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Signature Preview Modal */}
      {selectedSignature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 space-y-4 border border-amber-500/40 text-center shadow-[0_0_60px_rgba(212,175,55,0.3)]">
            <button
              onClick={() => setSelectedSignature(null)}
              type="button"
              className="absolute top-4 right-4 p-2 text-amber-400 hover:text-amber-200 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold gold-gradient-text pr-8">{selectedSignature.name}&apos;s Signature</h3>
            <div className="w-full h-48 bg-[#05070C] rounded-2xl border border-amber-500/30 flex items-center justify-center p-4">
              <img
                src={selectedSignature.url}
                alt="Signature"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
              />
            </div>
            <button
              onClick={() => setSelectedSignature(null)}
              type="button"
              className="gold-glow-btn px-6 py-2.5 rounded-xl text-amber-100 text-sm font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
