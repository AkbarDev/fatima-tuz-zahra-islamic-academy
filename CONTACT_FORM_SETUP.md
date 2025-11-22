# Fatima Tuz Zahra Islamic Academy - Contact Form Integration

## 🎉 Python Backend Successfully Created!

Your contact form now uses a **Python Flask backend** to handle form submissions and send emails to `asmamafiz@gmail.com`.

---

## 📁 Project Structure

```
fatima-tuz-zahra-islamic-academy/
├── index.html                  # Main website
├── styles.css                  # Styling
├── script.js                   # Navigation & UI interactions
├── contact-form.js             # Form submission to Python backend
├── images/                     # Course banner images
├── backend/                    # Python Flask API
│   ├── app.py                  # Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment variables template
│   └── README.md               # Backend setup instructions
└── README.md                   # This file
```

---

## 🚀 Quick Start Guide

### Step 1: Set Up Python Backend

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure email settings
cp .env.example .env
# Edit .env and add your Gmail credentials

# Run the backend server
python app.py
```

The API will run at `http://localhost:5000`

### Step 2: Update Frontend Configuration

Edit `contact-form.js` and update the API URL:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // For local testing
// OR
const API_BASE_URL = 'https://your-backend-url.com/api';  // For production
```

### Step 3: Test the Form

1. Open `index.html` in your browser
2. Fill out the contact form
3. Click "Send Message"
4. Check if email arrives at `asmamafiz@gmail.com`

---

## 📧 Email Configuration

The backend uses **Gmail SMTP** by default. To set this up:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to **Google Account > Security > App Passwords**
3. Generate a new App Password for "Mail"
4. Copy the password to your `.env` file

### Alternative Email Services

If you prefer not to use Gmail, you can easily integrate:

- **SendGrid** (Recommended for production)
- **Mailgun**
- **AWS SES**
- **Postmark**

See `backend/README.md` for details.

---

## 🌐 Deployment Options

Since GitHub Pages only hosts static files, you need to deploy the Python backend separately:

### Option 1: Vercel (Easiest) ⭐ RECOMMENDED

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from backend folder
cd backend
vercel
```

Your API will be live at: `https://your-project.vercel.app`

### Option 2: PythonAnywhere (Free Tier)

1. Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)
2. Upload your backend files
3. Configure a web app with Flask
4. Set environment variables in the web tab

### Option 3: Heroku

```bash
# Add Procfile to backend folder
echo "web: gunicorn app:app" > Procfile

# Deploy
heroku create
git push heroku main
```

### Option 4: Railway.app

1. Connect your GitHub repository
2. Select the backend folder
3. Add environment variables
4. Deploy!

---

## ⚙️ How It Works

### Frontend (Browser)

1. User fills out the contact form
2. JavaScript (`contact-form.js`) collects the data
3. Sends POST request to Python backend
4. Shows success/error notification

### Backend (Python Flask)

1. Receives form data via API endpoint
2. Validates required fields
3. Sends email using SMTP
4. Returns success/error response

### Email Flow

```
User fills form → JavaScript → Python Flask → Gmail SMTP → asmamafiz@gmail.com
```

---

## 🔒 Security Notes

- Never commit `.env` file to Git
- Use App Passwords (not your main Gmail password)
- Enable CORS only for your domain in production
- Always use HTTPS in production

 ---

## 📝 Next Steps

1. **Deploy the backend** to Vercel/PythonAnywhere
2. **Update API_BASE_URL** in `contact-form.js` with your deployment URL
3. **Test the form** thoroughly
4. **Update WhatsApp number** (currently placeholder)
5. **Push to GitHub** and deploy frontend to GitHub Pages

---

## 🆘 Troubleshooting

### "CORS Error"
- Make sure the backend is running
- Check that `flask-cors` is installed
- Update `API_BASE_URL` in contact-form.js

### "Email not sending"
- Verify Gmail credentials in `.env`
- Check App Password is correct
- Enable "Less secure app access" if using regular password (not recommended)

### "Form not submitting"
- Open browser console  (F12) to see errors
- Verify backend is running
- Check network tab for API calls

---

## 📞 Support

If you need help:
1. Check `backend/README.md` for detailed backend instructions
2. Review browser console for JavaScript errors
3. Check backend terminal for Python errors

---

**Built with ❤️ for Fatima Tuz Zahra Islamic Academy**
