# React Test Task

## Technologies

- React
- Redux
- Socket.io
- Tailwindcss
- Framer Motion

## Requirements:

- application should connect to the locally running service ✔
- application should render price changes for some tickers in real time ✔

## Bonuse Functionality:

- Additional visual effects to highlight positive or negative changes in the prices

When "price change" alters, it also changes its color. If a new price is bigger than an old one then color will be green. If it is smaller then "price change" has green color.

Please Note: I implement logic with changing color only to one parametr but no to all as I believe that it is enough to showcase my skills.

- The possibility to specify interval time by user
- The possibility to add/remove ticker from watching group

## Additional functionality

1. "Last Traded" parameter is displayed as a difference between current and previous time

In my opinion, it is more user-friendly to show only the difference between time and a small date below, rather than the whole date. Thus, user can quickly gain information he wants to.

2. Implemented animation similar to Google Finance

When a new value comes, the changing animation triggers.

3. Added an input bar to set the interval with validation logic
