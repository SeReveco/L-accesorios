import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";
import { any } from "astro/zod";


export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response("Correo electrónico y contraseña obligatorios", { status: 400 });
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return redirect("/signin");
    
};