import { createClient } from '@supabase/supabase-js';

export interface Review {
  id: string;
  rating: number;
  title: string;
  body: string;
  display_name: string | null;
  social_handle: string | null;
  social_platform: 'tiktok' | 'instagram' | 'youtube' | 'x' | null;
  is_featured: boolean;
  order_idx: number;
  created_at: string;
  approved_at: string | null;
  reviewer_full_name?: string | null;
  reviewer_avatar?: string | null;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

let _client: ReturnType<typeof createClient> | null = null;
function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON) return null;
  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

// Fetch all approved reviews. Featured first, then by order_idx desc, then by created_at desc.
// Called at build time (Server Component on a static-export route). Returns [] if not configured.
export async function getApprovedReviews(): Promise<Review[]> {
  const client = getClient();
  if (!client) return [];

  const { data: rows, error } = await client
    .from('reviews')
    .select('id, user_id, rating, title, body, display_name, social_handle, social_platform, is_featured, order_idx, created_at, approved_at')
    .eq('status', 'approved')
    .order('is_featured', { ascending: false })
    .order('order_idx', { ascending: false })
    .order('created_at', { ascending: false });

  if (error || !rows) {
    if (error) console.warn('[reviews] fetch failed:', error.message);
    return [];
  }

  const userIds = Array.from(new Set(rows.map((r: any) => r.user_id))).filter(Boolean);
  let profiles = new Map<string, { full_name: string | null; avatar_url: string | null }>();
  if (userIds.length > 0) {
    const { data: profs } = await client
      .from('profiles')
      .select('id, full_name, avatar_url')
      .in('id', userIds);
    (profs ?? []).forEach((p: any) =>
      profiles.set(p.id, { full_name: p.full_name ?? null, avatar_url: p.avatar_url ?? null }),
    );
  }

  return rows.map((r: any) => {
    const prof = profiles.get(r.user_id);
    const review: Review = {
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      display_name: r.display_name,
      social_handle: r.social_handle,
      social_platform: r.social_platform,
      is_featured: r.is_featured,
      order_idx: r.order_idx,
      created_at: r.created_at,
      approved_at: r.approved_at,
      reviewer_full_name: prof?.full_name ?? null,
      reviewer_avatar: prof?.avatar_url ?? null,
    };
    return review;
  });
}

export function aggregateRating(reviews: Review[]) {
  if (reviews.length === 0) return { avg: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    avg: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}
