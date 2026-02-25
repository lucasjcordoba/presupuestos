import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getWeekStart } from '@/lib/helpers';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServerSupabaseClient();
  const semanaInicio = getWeekStart();

  const { data: presupuesto } = await supabase
    .from('presupuestos')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('semana_inicio', semanaInicio)
    .maybeSingle();

  if (!presupuesto) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('gastos')
    .delete()
    .eq('id', id)
    .eq('presupuesto_id', presupuesto.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
