# Google Analytics Setup Guide for Flix

## ✅ Setup Complete!

Google Analytics has been successfully integrated into your Flix application using the standard Google Analytics 4 (GA4) implementation.

## What Was Implemented

### Direct GA4 Integration
Instead of using a third-party Angular package, we've implemented Google Analytics using the official Google gtag.js script directly in the HTML. This approach:
- ✅ Works with any Angular version
- ✅ Is the official Google-recommended method
- ✅ Requires no additional npm packages
- ✅ Provides full GA4 functionality

### Your Tracking ID
**Measurement ID:** `G-NZ4SWBJ7MX`

### Files Modified

#### `src/index.html`
Added the official Google Analytics tracking code in the `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NZ4SWBJ7MX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NZ4SWBJ7MX');
</script>
```

#### Environment Files (Optional)
The tracking ID is also stored in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

These can be used if you want to add custom event tracking in your TypeScript code later.

## What Gets Tracked Automatically

### 1. Page Views
- Every page load and navigation is automatically tracked
- You'll see which pages users visit most

### 2. User Sessions
- How long users stay on your site
- Number of pages per session
- Bounce rate (single-page visits)

### 3. User Demographics
- Geographic location (country, city)
- Device type (desktop, mobile, tablet)
- Browser and operating system
- Screen resolution

### 4. Traffic Sources
- Where visitors come from (direct, search, social media, referrals)
- Which search engines bring traffic
- Social media platforms driving traffic
- Campaign tracking (if you use UTM parameters)

### 5. Real-Time Data
- See live visitors on your site
- What pages they're viewing right now
- Where they're located

## Viewing Your Analytics Data

### Access Your Dashboard
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your "movie-app-flix" property
3. View your reports

### Key Reports to Check

#### Real-Time Report
- **Location:** Reports → Realtime
- **Shows:** Live visitors on your site right now
- **Best for:** Immediate verification that tracking is working

#### Acquisition Report
- **Location:** Reports → Acquisition → Traffic acquisition
- **Shows:** How users find your site
- **Metrics:** Sessions by source/medium (Google, Direct, Social, etc.)

#### Engagement Report
- **Location:** Reports → Engagement → Pages and screens
- **Shows:** Most popular pages on your site
- **Metrics:** Page views, average engagement time

#### User Demographics
- **Location:** Reports → User → Demographics
- **Shows:** Age, gender, interests, location
- **Note:** May take 24-48 hours to populate

### Key Metrics to Monitor

| Metric | What It Means |
|--------|---------------|
| **Users** | Total number of unique visitors |
| **Sessions** | Total visits to your site |
| **Page Views** | Total pages viewed |
| **Avg Session Duration** | How long users stay |
| **Bounce Rate** | % of single-page sessions |
| **Pages per Session** | Average pages viewed per visit |

## Testing Your Setup

### 1. Immediate Testing (Real-Time)
1. Visit your deployed site: https://ganapathysubramanian.github.io/Flix/
2. Navigate between different pages (Movies, TV Shows, etc.)
3. Open Google Analytics → Reports → Realtime
4. You should see yourself as an active user within 1-2 minutes

### 2. Standard Reports
- Data appears in standard reports within 24-48 hours
- More detailed insights become available over time

## Custom Event Tracking (Optional)

If you want to track specific user actions beyond page views, you can add custom events.

### Example: Track "Watch Now" Button Clicks

Add this to any component where you want to track events:

```typescript
// In your component
onWatchNowClick(movieTitle: string) {
  // Track the event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'watch_now_click', {
      'event_category': 'engagement',
      'event_label': movieTitle,
      'value': 1
    });
  }
  
  // Your existing code...
}
```

### Example: Track Search Queries

```typescript
onSearch(query: string) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'search', {
      'search_term': query
    });
  }
  
  // Your existing code...
}
```

### Example: Track Movie/Show Views

```typescript
onMovieView(movieId: number, movieTitle: string) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_item', {
      'event_category': 'content',
      'event_label': movieTitle,
      'value': movieId
    });
  }
}
```

## Privacy Considerations

### GDPR Compliance
If you have European visitors, consider:
- Adding a cookie consent banner
- Informing users about analytics tracking
- Allowing users to opt-out
- Consider using packages like `ngx-cookieconsent`

### Data Anonymization
- Google Analytics 4 automatically anonymizes IP addresses
- Additional privacy settings can be configured in your GA4 property settings

### Privacy-Friendly Configuration
You can add these parameters to make tracking more privacy-friendly:

```javascript
gtag('config', 'G-NZ4SWBJ7MX', {
  'anonymize_ip': true,
  'allow_google_signals': false,
  'allow_ad_personalization_signals': false
});
```

## Troubleshooting

### No Data Showing?

1. **Check Real-Time Reports First**
   - Standard reports take 24-48 hours
   - Real-Time shows data within minutes

2. **Verify Tracking Code**
   - Open your site
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for requests to `google-analytics.com` or `googletagmanager.com`

3. **Check for Ad Blockers**
   - Ad blockers prevent analytics tracking
   - Disable them when testing

4. **Verify Deployment**
   - Make sure the latest version is deployed
   - Clear browser cache and reload

### Common Issues

| Issue | Solution |
|-------|----------|
| No real-time data | Wait 2-3 minutes, refresh GA dashboard |
| Ad blocker active | Disable ad blocker for testing |
| Wrong tracking ID | Verify `G-NZ4SWBJ7MX` in index.html |
| Old cached version | Clear browser cache, hard reload (Ctrl+Shift+R) |

## Deployment Information

### Your Live Site
**URL:** https://ganapathysubramanian.github.io/Flix/

### Redeploying After Changes

If you make changes and want to redeploy:

```bash
# Build for production
npm run build -- --configuration production --base-href /Flix/

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/flix
```

## Advanced Features

### Enhanced Measurement (Auto-Enabled)
GA4 automatically tracks:
- Scrolling (90% scroll depth)
- Outbound link clicks
- Site search (if configured)
- Video engagement (YouTube embeds)
- File downloads

### Custom Dimensions
You can add custom dimensions in GA4 to track:
- User preferences (theme: dark/light)
- Content categories (movie genres)
- User actions (watchlist additions)

### Conversion Tracking
Set up conversions in GA4 for:
- Newsletter signups
- Account registrations
- Specific page visits
- Custom events

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Best Practices](https://support.google.com/analytics/answer/9267735)
- [gtag.js Developer Guide](https://developers.google.com/analytics/devguides/collection/gtagjs)

## Summary

✅ **Google Analytics is now live on your Flix application!**

### What's Working:
- ✅ Tracking code installed in index.html
- ✅ Measurement ID: G-NZ4SWBJ7MX
- ✅ Application built and deployed to GitHub Pages
- ✅ Automatic page view tracking enabled
- ✅ Real-time visitor tracking active

### What You Can See:
- 📊 Number of visitors to your site
- 📈 Most popular movies/TV shows viewed
- 🌍 Geographic distribution of visitors
- 📱 Desktop vs mobile usage
- 🔍 How users find your site
- ⏱️ How long users stay on your site
- 🎯 User engagement and behavior patterns

### Next Steps:
1. Visit your site: https://ganapathysubramanian.github.io/Flix/
2. Check Real-Time reports in Google Analytics (within 2-3 minutes)
3. Wait 24-48 hours for full reports to populate
4. Monitor your visitor statistics regularly
5. (Optional) Add custom event tracking for specific user actions

Your analytics are now collecting data! 🎉
