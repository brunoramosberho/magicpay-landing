import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Verificar que la API key esté configurada
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Error de configuración del servidor: RESEND_API_KEY no encontrada' },
        { status: 500 }
      );
    }

    // Inicializar Resend con la API key
    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, email, company, country, message } = body;

    // Validar que todos los campos estén presentes
    if (!name || !email || !company || !country || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar correo a ambas direcciones
    const emailBody = `
Nueva solicitud de demo recibida:

Nombre: ${name}
Email: ${email}
Empresa: ${company}
País: ${country}

Mensaje:
${message}

---
Este correo fue enviado desde el formulario de contacto de MagicPay.
    `.trim();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #306FF6;">Nueva solicitud de demo recibida</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>País:</strong> ${country}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #306FF6;">Mensaje:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Este correo fue enviado desde el formulario de contacto de MagicPay.</p>
      </div>
    `;

    // Enviar correo usando Resend
    const { data, error } = await resend.emails.send({
      from: 'MagicPay Contact <onboarding@resend.dev>', // Cambiar según tu dominio verificado en Resend
      to: ['bruno@magicpay.mx', 'santiago@magicpay.mx'],
      replyTo: email,
      subject: `Nueva solicitud de demo - ${company}`,
      text: emailBody,
      html: emailHtml,
    });

    if (error) {
      console.error('Error enviando correo:', error);
      return NextResponse.json(
        { error: `Error al enviar el correo: ${error.message || JSON.stringify(error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: `Error interno del servidor: ${errorMessage}` },
      { status: 500 }
    );
  }
}

