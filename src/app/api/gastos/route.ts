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

  const { data: presupuesto } = await supabase
    .from('presupuestos')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('semana_inicio', semanaInicio)
    .maybeSingle();

  if (!presupuesto) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from('gastos')
    .select('id, nombre, cantidad, categoria_id, fecha, categoria:categorias(nombre, color)')
    .eq('presupuesto_id', presupuesto.id)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const nombre      = String(body.nombre ?? '').trim();
  const cantidad    = Number(body.cantidad);
  const categoria_id = body.categoria_id ?? null;
  const fecha        = body.fecha ?? null;

  if (!nombre || !cantidad || cantidad < 1) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const semanaInicio = getWeekStart();

  const { data: presupuesto } = await supabase
    .from('presupuestos')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('semana_inicio', semanaInicio)
    .maybeSingle();

  if (!presupuesto) {
    return NextResponse.json(
      { error: 'Definí un presupuesto primero' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('gastos')
    .insert({ presupuesto_id: presupuesto.id, nombre, cantidad, categoria_id, fecha })
    .select('id, nombre, cantidad, categoria_id, fecha, categoria:categorias(nombre, color)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
