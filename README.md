# Syria Market Web

A beautiful, responsive marketplace website for displaying ads with an attractive design. Built with Node.js, Express, and vanilla JavaScript.

## Features

- **Modern Design**: Beautiful gradient backgrounds with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Image Gallery**: Support for up to 6 images with thumbnail navigation
- **Interactive Elements**: Smooth animations and hover effects
- **Social Sharing**: Share ads via WhatsApp, Facebook, or copy link
- **Mobile-Friendly**: Touch/swipe support for image navigation
- **API Integration**: RESTful API for fetching ad data

## Pages

1. **Welcome Page** (`/`): Beautiful landing page with features and demo section
2. **Ad Display Page** (`/ad/:id`): Detailed ad view with image gallery and seller information

## API Endpoints

- `GET /api/ads/getAdById/:id` - Fetch ad details by ID

## Project Structure

```
syria-market-web/
├── public/
│   ├── index.html          # Welcome page
│   ├── ad.html            # Ad display page
│   ├── styles.css         # Main stylesheet
│   ├── script.js          # Homepage JavaScript
│   └── ad-script.js       # Ad page JavaScript
├── server.js              # Express server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:10000` to view the website.

## Production

Start the production server:
```bash
npm start
```

## Deployment on Render.com

### Steps to Deploy:

1. **Create a Render Account**: Go to [render.com](https://render.com) and sign up

2. **Connect Your Repository**: 
   - Push your code to GitHub
   - Connect your GitHub account to Render

3. **Create a New Web Service**:
   - Click "New +" -> "Web Service"
   - Select your repository
   - Configure the service:

4. **Build & Deploy Settings**:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Port**: The app will automatically use the PORT environment variable provided by Render

5. **Environment Variables** (if needed):
   - Add any environment variables in the Render dashboard

6. **Deploy**: Click "Create Web Service"

### Alternative: Deploy from Git

You can also deploy directly by connecting your Git repository to Render.

## Sample Ad Data

The application includes sample ad data for testing. Use this ad ID for demo: `68923a39f2c07e88dd10824a`

## API Response Format

```json
{
  "location": {
    "type": "Point",
    "coordinates": [0, 0]
  },
  "_id": "68923a39f2c07e88dd10824a",
  "adTitle": "Flower Bouquets",
  "userId": "688f1c7fdf60175a782abafd",
  "userName": "Heba Badawi",
  "userPhone": "905352640462",
  "price": "300",
  "currencyId": 4,
  "currencyName": "L.T",
  "categoryId": 7,
  "categoryName": "Community",
  "subCategoryId": 58,
  "subCategoryName": "Gifts and Toys",
  "cityId": 4,
  "cityName": "Idlib",
  "regionId": 15,
  "regionName": "Ram Hamdan",
  "createDate": "2025-08-05T17:07:05.313Z",
  "description": "Custom Flowers",
  "isApproved": true,
  "__v": 0,
  "images": ["base64_string_here"]
}
```

## Features in Detail

### Design Elements
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glassmorphism**: Translucent elements with blur effects
- **Smooth Animations**: CSS transitions and keyframe animations
- **Typography**: Modern Poppins font family
- **Icons**: Font Awesome icons throughout

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Image Gallery
- Main image display with overlay controls
- Thumbnail navigation
- Keyboard arrow key support
- Touch/swipe navigation on mobile
- Fallback placeholder images
- Image counter display

### Interactive Features
- Contact seller via WhatsApp
- Social media sharing
- Copy link functionality
- Report ad functionality
- Smooth scrolling navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images and assets
- Minimal dependencies
- Efficient CSS and JavaScript
- Fast loading times

## License

MIT License
