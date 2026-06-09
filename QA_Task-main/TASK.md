QA Engineer Assessment – Live Interview Task
Duration: 45–60 minutes  
Application: Wallet Recharge App (Mobile Recharge Platform)
Background
You have been given access to a Wallet Recharge application used for mobile prepaid recharges. The app allows users to log in, check their wallet balance, perform mobile recharges, view transaction history, and manage their profile.
Your job is to test this application as if it were about to go to production.
Setup
docker compose up --build
App: http://localhost:8000
Test Credentials:
User	Mobile
Rahul Sharma	9876543210
Priya Patel	9123456789
Your Tasks
1. Exploratory Testing (20–25 min)
Explore the application manually and identify as many bugs/issues as possible. Test across:
- Functional correctness
- Input validation
- Business logic
- UI/UX behavior
- Security
- API responses (use browser DevTools Network tab)
- Edge cases
2. Write Automated Tests (15–20 min)
Using the Playwright setup provided, write 2–3 automated test cases that verify expected behavior or expose bugs you found.
# Install Playwright browser (one-time)
npx playwright install chromium
# Run your tests
npm test
# Run with browser visible
npm run test:headed
Write tests in tests/e2e/. Reference examples are already there.
3. Bug Reports (5–10 min)
Pick your top 2–3 findings and write brief bug reports covering:
- Title
- Steps to reproduce
- Expected vs. Actual behavior
- Severity (Critical / High / Medium / Low)
4. Discussion (5–10 min)
Be prepared to discuss:
- Which bugs are release blockers and why?
- What would you automate first if given more time?
- Did you notice any API/backend issues beyond the UI?
- How would you approach regression testing after fixes?
What We're Evaluating
Criteria	What we look for
Bug discovery	Breadth and depth of issues found
Severity assessment	Correct prioritization of findings
Test writing	Practical Playwright usage, meaningful assertions
Communication	Clear, reproducible bug reports
Critical thinking	Understanding of risk, security awareness
Available API Endpoints (for direct testing)
Method	Endpoint
POST	/api/recharge
GET	/api/transactions
GET	/api/transactions/{id}
GET	/api/balance
All endpoints require an authenticated session (login via browser first, then use the session cookie).
Good luck. Treat this like a real product about to ship.
