import type { APIRoute } from 'astro';
import { supabase } from '../../../db/supabase';

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { idpromocion } = await request.json();

    if (!idpromocion) {
      return new Response("ID es obligatorio", { status: 400 });
    }

    // Eliminar las asociaciones en la tabla intermedia primero
    const { data: deletedRelations, error: relationsError } = await supabase
      .from('promociones_productos')
      .delete()
      .eq('idpromocion', idpromocion);

    if (relationsError) {
      throw relationsError;
    }

    // Luego eliminar la promoción
    const { data: deletedPromotion, error: promotionError } = await supabase
      .from('promociones')
      .delete()
      .eq('idpromocion', idpromocion);

    if (promotionError) {
      throw promotionError;
    }

    const exito = console.log('Promocion eliminada con exito')

    return new Response(JSON.stringify(exito), { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
