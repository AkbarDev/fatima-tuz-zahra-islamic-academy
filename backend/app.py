from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Email Configuration
RECIPIENT_EMAIL = "asmamafiz@gmail.com"

@app.route('/api/submit-contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions"""
    try:
        # Get form data
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', 'Not provided')
        course = data.get('course', 'Not specified')
        message = data.get('message')
        
        # Create email content
        email_subject = f"New Contact Form Submission - FTZ Academy from {name}"
        email_body = f"""
        New Contact Form Submission - Fatima Tuz Zahra Islamic Academy
        
        Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        Contact Details:
        ─────────────────────────────────
        Name: {name}
        Email: {email}
        Phone: {phone}
        Course Interest: {course}
        
        Message:
        ─────────────────────────────────
        {message}
        
        ─────────────────────────────────
        This submission was sent from the FTZ Academy website contact form.
        """
        
        # Send email using Gmail SMTP (or configure your preferred email service)
        send_email(RECIPIENT_EMAIL, email_subject, email_body, reply_to=email)
        
        return jsonify({
            'status': 'success',
            'message': 'Thank you for your message! We will contact you soon.'
        }), 200
        
    except Exception as e:
        print(f"Error processing form: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'An error occurred while processing your request. Please try again.'
        }), 500


def send_email(to_email, subject, body, reply_to=None):
    """
    Send email using Gmail SMTP
    
    To use this function, you need to:
    1. Set environment variables: GMAIL_USER and GMAIL_APP_PASSWORD
    2. Enable 2-factor authentication on your Gmail account
    3. Generate an App Password from your Google Account settings
    
    Alternative: Use a service like SendGrid, Mailgun, or AWS SES
    """
    
    # Option 1: Gmail SMTP (requires app password)
    try:
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
        
        if not gmail_user or not gmail_password:
            # If Gmail credentials not configured, print to console
            print("=" * 60)
            print("EMAIL NOTIFICATION (Gmail not configured)")
            print("=" * 60)
            print(f"To: {to_email}")
            print(f"Subject: {subject}")
            print(f"\n{body}")
            print("=" * 60)
            # In production, you should raise an error here
            return
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = to_email
        msg['Subject'] = subject
        if reply_to:
            msg['Reply-To'] = reply_to
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send via Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.send_message(msg)
        server.quit()
        
        print(f"Email sent successfully to {to_email}")
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'FTZ Academy Contact Form API',
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    # Run in development mode
    # In production, use a WSGI server like Gunicorn
    app.run(debug=True, host='0.0.0.0', port=5000)
