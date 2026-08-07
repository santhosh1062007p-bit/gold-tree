import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const [rows] = await pool.query('SELECT * FROM guests WHERE status = "active" ORDER BY timestamp ASC');
    
    // Format JSON leafPosition from string/json column
    const guests = (rows as any[]).map((row) => ({
      guestId: row.guest_id,
      name: row.name,
      designation: row.designation,
      organization: row.organization,
      eventName: row.event_name,
      eventDate: row.event_date,
      timestamp: Number(row.timestamp),
      signatureUrl: row.signature_url,
      branchId: row.branch_id,
      anchorId: row.anchor_id,
      leafPosition: typeof row.leaf_position === 'string' ? JSON.parse(row.leaf_position) : row.leaf_position,
      status: row.status,
      createdAt: row.created_at
    }));

    return NextResponse.json({ success: true, guests });
  } catch (error) {
    console.error('API GET /api/guests error:', error);
    return NextResponse.json(
      { success: false, error: 'Database query failed', guests: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { guest } = body;

    if (!guest || !guest.guestId || !guest.name) {
      return NextResponse.json({ success: false, error: 'Invalid guest payload' }, { status: 400 });
    }

    await initDatabase();

    const query = `
      INSERT INTO guests 
      (guest_id, name, designation, organization, event_name, event_date, timestamp, signature_url, branch_id, anchor_id, leaf_position, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
      name=VALUES(name), designation=VALUES(designation), organization=VALUES(organization),
      event_name=VALUES(event_name), event_date=VALUES(event_date), signature_url=VALUES(signature_url), status=VALUES(status);
    `;

    await pool.query(query, [
      guest.guestId,
      guest.name,
      guest.designation,
      guest.organization,
      guest.eventName,
      guest.eventDate,
      guest.timestamp,
      guest.signatureUrl,
      guest.branchId,
      guest.anchorId,
      JSON.stringify(guest.leafPosition),
      guest.status || 'active'
    ]);

    return NextResponse.json({ success: true, message: 'Guest stored in MySQL database.' });
  } catch (error) {
    console.error('API POST /api/guests error:', error);
    return NextResponse.json(
      { success: false, error: 'Database insert failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const guestId = searchParams.get('guestId');
    const action = searchParams.get('action');

    await initDatabase();

    if (action === 'reset') {
      await pool.query('DELETE FROM guests');
      return NextResponse.json({ success: true, message: 'All guest records reset successfully.' });
    }

    if (guestId) {
      await pool.query('DELETE FROM guests WHERE guest_id = ?', [guestId]);
      return NextResponse.json({ success: true, message: `Guest ${guestId} deleted successfully.` });
    }

    return NextResponse.json({ success: false, error: 'Missing guestId or action' }, { status: 400 });
  } catch (error) {
    console.error('API DELETE /api/guests error:', error);
    return NextResponse.json(
      { success: false, error: 'Database delete failed' },
      { status: 500 }
    );
  }
}
