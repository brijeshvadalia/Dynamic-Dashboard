# Technical Document - Portfolio Dashboard

## Problem Statement
Provide investors with real-time insights into their stock portfolios by fetching CMP, P/E ratio, and earnings.

## Key Challenges & Solutions

| Challenge                  | Solution                                      |
|----------------------------|----------------------------------------------|
| No official APIs           | Used scraping via Cheerio (Yahoo/Google)     |
| Rate Limiting              | In-memory caching (expires every 1 min)      |
| Asynchronous data fetching | Implemented with async/await + Promise.all   |
| Performance                | React.memo, optimized state updates         |
| Error Handling             | Try/Catch blocks in backend services         |
| Dynamic UI Updates         | `setInterval` every 15s in frontend          |

## Author
Brijesh
