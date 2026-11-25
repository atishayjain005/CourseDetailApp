# Course Detail App

A Next.js course-management interface. The existing **Add Course** action sends a fixed JavaScript sample to the original external service. Successful responses appear immediately in the current session, with search, publication status and added-order filters.

## Run locally

Use Node.js 22 and npm:

```sh
npm ci --ignore-scripts
npm test
npm run lint
NODE_OPTIONS=--openssl-legacy-provider npm run build
npm start
```

For development: `NODE_OPTIONS=--openssl-legacy-provider npm run dev`.
The compatibility flag is needed by the legacy Next.js 11/Webpack toolchain on modern Node. It is not a dependency-security fix.

## Behavior and limitations

- The service is `https://65.1.150.227:5000/api/Tests/add`. Requests preserve the original POST/query-string contract. Do not use it for private information.
- This is not a course editor or a complete catalog: there is no supplied list, update or delete API. Reloading clears the local list, and **does not delete courses on the service**.
- Requests time out after 15 seconds. Failures never insert a course locally or retry automatically. An uncertain response may still have created a remote record; check the service before retrying.
- Only validated name, description and publication status are displayed. Type filtering remains visibly unavailable because the contract supplies no type. Sort order is when courses were added to this page, not a server timestamp.
- The page includes loading, empty, no-match and failure feedback, labeled native filters and a responsive grid.

## Verification

`npm test` covers malformed data, request contract, transport/HTTP/JSON failures, timeouts, filtering, duplicate pending submissions, successful rendering and recovery without losing existing entries. All network calls in tests are mocked; tests do not create external courses. GitHub Actions runs tests, lint and the production build.

## Release status

Not production-ready. The November 26, 2026 install audit reported **33 vulnerabilities (6 moderate, 17 high, 10 critical)** in the legacy dependency tree. A supported framework/toolchain migration needs separate scope and validation. No live successful service request has been verified, and this work does not establish backend ownership, authentication or availability.

No existing hosting URL was listed in repository metadata at inspection. Any integration discovered by the PR must be verified separately. Do not deploy this legacy stack to production until dependencies and service behavior are resolved. No paid infrastructure is required by the local changes.

See [the improvement register](docs/improvement-log.md) for scoped work and release follow-ups.
