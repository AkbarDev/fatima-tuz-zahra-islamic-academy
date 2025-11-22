# FTZ Academy Backend API

This is the Python Flask backend for handling contact form submissions.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Gmail credentials
# (See instructions in .env.example file)
```

### 3. Run Locally
```bash
python app.py
```
The API will be available at `http://localhost:5000`

### 4. Test the API
```bash
curl -X POST http://localhost:5000/api/submit-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "course": "Quran Recitation",
    "message": "This is a test message"
  }'
```

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the backend directory
3. Follow the prompts
4. Update your frontend to use the Vercel URL

### Option 2: PythonAnywhere (Free Tier)
1. Sign up at pythonanywhere.com
2. Upload your code
3. Configure a web app
4. Set environment variables in the web tab

### Option 3: Heroku
1. Install Heroku CLI
2. Create a `Procfile` with: `web: gunicorn app:app`
3. Run `heroku create`
4. Run `git push heroku main`

### Option 4: AWS Lambda (Serverless)
Use Zappa or Chalice to deploy as a serverless function.

## API Endpoints

### POST /api/submit-contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "course": "Quran Recitation",
  "message": "I am interested in learning Quran"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Thank you for your message! We will contact you soon."
}
```

### GET /api/health
Health check endpoint.

## Email Configuration

The backend uses Gmail SMTP by default. To use a different email service:

- **SendGrid**: Install `sendgrid` package and use their API
- **Mailgun**: Install `mailgun` package
- **AWS SES**: Use `boto3` for AWS Simple Email Service

## Security Notes

- Never commit `.env` file to Git
- Use App Passwords for Gmail (not your main password)
- Enable CORS only for your frontend domain in production
- Use HTTPS in production
