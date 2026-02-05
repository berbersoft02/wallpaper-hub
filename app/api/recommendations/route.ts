import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // If Resend is configured, send email
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: 'berbersoft@gmail.com',
          replyTo: email,
          subject: `New Recommendation from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d300c5;">New Recommendation Received</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>
              <div style="background: #ffffff; padding: 20px; border-left: 4px solid #d300c5; margin: 20px 0;">
                <h3 style="color: #333;">Message:</h3>
                <p style="color: #666; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          `,
        });

        return NextResponse.json({ 
          success: true,
          message: 'Recommendation sent successfully! Thank you!' 
        });
      } catch (emailError) {
        console.error('Error sending email via Resend:', emailError);
        // Fallback: log the recommendation
        console.log('Recommendation received (email failed):', {
          from: email,
          name,
          message,
          to: 'berbersoft@gmail.com',
        });
        
        return NextResponse.json({ 
          success: true,
          message: 'Recommendation received! (Email service not configured - check console logs)' 
        });
      }
    } else {
      // Resend not configured - log the recommendation
      console.log('Recommendation received (Resend not configured):', {
        from: email,
        name,
        message,
        to: 'berbersoft@gmail.com',
      });

      return NextResponse.json({ 
        success: true,
        message: 'Recommendation received! (Email service not configured - check console logs)' 
      });
    }
  } catch (error) {
    console.error('Error processing recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to send recommendation' },
      { status: 500 }
    );
  }
}
