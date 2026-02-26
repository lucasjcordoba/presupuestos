import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getWeekStart } from '@/lib/helpers';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  const semanaInicio = getWeekStart();

  const { data, error } = await supabase
    .from('presupuestos')
    .select('id, cantidad')
    .eq('user_id', session.user.id)
    .eq('semana_inicio', semanaInicio)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? { id: null, cantidad: 0 });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const cantidad = Number(body.cantidad);
  if (!cantidad || cantidad < 1) {
    return NextResponse.json({ error: 'Cantidad inválida' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const semanaInicio = getWeekStart();

  const { data, error } = await supabase
    .from('presupuestos')
    .upsert(
      { user_id: session.user.id, semana_inicio: semanaInicio, cantidad },
      { onConflict: 'user_id,semana_inicio' }
    )
    .select('id, cantidad')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
