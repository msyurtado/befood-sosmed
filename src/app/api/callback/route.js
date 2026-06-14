import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const cabangCode = searchParams.get('state');
  const error = searchParams.get('error');

  // Kalau user cancel atau ada error dari Meta
  if (error || !code) {
    return NextResponse.redirect(
      new URL('/connect?status=cancelled', request.url)
    );
  }

  try {
    // 1. Tukar code dengan short-lived token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&` +
      `client_secret=${process.env.META_APP_SECRET}&` +
      `redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&` +
      `code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error('Token exchange error:', tokenData.error);
      return NextResponse.redirect(
        new URL('/connect?status=error', request.url)
      );
    }

    const shortToken = tokenData.access_token;

    // 2. Perpanjang jadi long-lived token (60 hari)
    const longRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `grant_type=fb_exchange_token&` +
      `client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&` +
      `client_secret=${process.env.META_APP_SECRET}&` +
      `fb_exchange_token=${shortToken}`
    );
    const longData = await longRes.json();
    const longToken = longData.access_token;
    const expiresIn = longData.expires_in || 5184000; // default 60 hari

    // 3. Ambil daftar Facebook Pages milik user
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${longToken}`
    );
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.[0];

    if (!page) {
      return NextResponse.redirect(
        new URL('/connect?status=no_page', request.url)
      );
    }

    // 4. Ambil Instagram Business Account ID dari Page
    const igRes = await fetch(
      `https://graph.facebook.com/v19.0/${page.id}?` +
      `fields=instagram_business_account&` +
      `access_token=${page.access_token}`
    );
    const igData = await igRes.json();
    const igAccountId = igData.instagram_business_account?.id;

    if (!igAccountId) {
      return NextResponse.redirect(
        new URL('/connect?status=no_ig', request.url)
      );
    }

    // 5. Simpan token ke Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    const { error: dbError } = await supabase
      .from('cabang_tokens')
      .upsert({
        cabang_code: cabangCode,
        ig_account_id: igAccountId,
        access_token: longToken,
        expires_at: expiresAt,
      }, {
        onConflict: 'cabang_code'
      });

    if (dbError) {
      console.error('DB error:', dbError);
      return NextResponse.redirect(
        new URL('/connect?status=error', request.url)
      );
    }

    // 6. Redirect ke halaman sukses
    return NextResponse.redirect(
      new URL(`/connect?status=success&cabang=${cabangCode}`, request.url)
    );

  } catch (err) {
    console.error('Callback error:', err);
    return NextResponse.redirect(
      new URL('/connect?status=error', request.url)
    );
  }
}
