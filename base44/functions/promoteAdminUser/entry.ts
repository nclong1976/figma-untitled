import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const ADMIN_EMAIL = "admin@gmail.com";

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    // Only the verified owner of the designated admin email may promote themselves.
    if (user.email !== ADMIN_EMAIL) {
      return Response.json({ error: 'Not eligible for admin promotion' }, { status: 403 });
    }
    if (user.role !== 'admin') {
      await base44.asServiceRole.entities.User.update(user.id, { role: 'admin' });
    }
    return Response.json({ ok: true, role: 'admin' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}