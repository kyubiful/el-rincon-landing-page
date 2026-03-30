import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name : '';
  const email = typeof body.email === 'string' ? body.email : '';
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const message = typeof body.message === 'string' ? body.message : '';

  // Validate: all fields required
  if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate: email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email format' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Mail transport not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: import.meta.env.MAIL_FROM ?? 'onboarding@resend.dev',
      to: import.meta.env.MAIL_TO ?? 'elrincon.valdemanco@gmail.com',
      replyTo: email,
      subject: `Contacto web: ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
