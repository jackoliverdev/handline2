import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Make sure all products have complete field structure for MiniProductCard
    const formattedData = data.map(product => ({
      ...product,
      id: product.id,
      name: product.name,
      category: product.category || 'Uncategorised',
      image_url: product.image_url || null,
      temperature_rating: product.temperature_rating || null,
      cut_resistance_level: product.cut_resistance_level || null
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[API] Create product payload keys:', Object.keys(body));
    // Helpful debugging prints
    console.log('[API] Name:', body?.name, 'Category:', body?.category, 'Published:', body?.published);

    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select('*')
      .single();

    if (error) {
      console.error('[API] Supabase insert error:', {
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });
      return NextResponse.json({ error: { message: error.message, details: (error as any).details, hint: (error as any).hint, code: (error as any).code } }, { status: 500 });
    }

    console.log('[API] Product created with ID:', data?.id);
    return NextResponse.json({ product: data });
  } catch (err: any) {
    console.error('[API] POST /api/products exception:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
