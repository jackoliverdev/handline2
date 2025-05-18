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
