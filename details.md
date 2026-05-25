# Engineering Blueprint

## Database Collections

### User
Schema architecture details:
- `isPro`: Boolean indicating premium user status.
- `proExpiresAt`: Date object defining subscription termination.
- `plan`: String identifying the current active subscription tier (e.g., 'free', 'monthly', 'yearly').

### Notification
Schema architecture details:
- Features an automated 7-message auto-pruning rule. As new notifications are generated, older ones are deleted to ensure the storage per user never exceeds 7 active alerts.

### ChatMessage
Schema architecture details:
- Features a 40-message auto-pruning rule. When Stocrates generates an AI response, an internal hook evaluates the user's message density. If the count exceeds 40 messages, the oldest messages are pruned systematically to keep the history lean and cost-effective.

## Core API Routes & Functions

### `/api/wealth/generate`
Handles the generation of specific AI portfolio blueprints using Gemini and Boglehead logic. Validates user age, monthly investment amounts, and risk tolerance before returning an investment strategy.

### `/api/checkout/redeem`
Handles global gateway callback logic for premium user account upgrades. Transitions the user's `isPro` status to `true` and accurately timestamps the `proExpiresAt` horizon.

### `/api/notifications`
Serves dynamic, low-latency system alerts and application updates to the client. Incorporates the 7-message auto-pruning architecture.

### `/api/chat/history`
Fetches the authenticated user's chat history from the MongoDB cluster. Sorts by `createdAt` in chronological order (oldest first, newest last) and restricts the payload to a strict ceiling of 40 messages to enforce the UI memory limit constraints.

### Secure CRON Endpoints (`/api/cron/...`)
Protected backend routes intended solely for external automated schedulers. Authorized using a strict `Bearer CRON_SECRET` headers check to issue automated Monthly Digests and trigger Market Briefs.

## State Management & UX Fixes

### NGINX 403-to-400 Proxy Status Translation
An operational networking fix applied to resolve strict proxy rejections, accurately translating HTTP 403 Forbidden states into standard 400 Bad Requests when external gateway proxies falsely flag specific payload structures.

### Calendar Optimistic UI Update
Implemented optimistic UI logic allowing the frontend to instantly render local calendar inputs and form updates before the API responds. This guarantees zero-latency perceived responsiveness.

### `target="_blank"` Safe External Routing Policies
Hardened all external out-bound application anchors utilizing `target="_blank"` with explicit `rel="noopener noreferrer"` attributes, securing the broader DOM against malicious cross-origin tab hijacking.
