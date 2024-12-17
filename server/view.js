const homeView = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mates API</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      background: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    h1 {
      color: #3b82f6;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    a {
      text-decoration: none;
      color: #ffffff;
      background-color: #3b82f6;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      font-size: 1rem;
      transition: background 0.3s ease;
    }
    a:hover {
      background-color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Mates API</h1>
    <p>Welcome to the Mates API. Explore the available endpoints and documentation.</p>
    <a href="/api/docs">Go to API Documentation</a>
  </div>
</body>
</html>
`;

module.exports = homeView;
