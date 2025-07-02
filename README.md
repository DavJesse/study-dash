# Zone01 Profile Dashboard

This project is a React-based dashboard for Zone01 students to visualize and explore their personal school data using the platform's GraphQL API. The main objective is to provide a modern, interactive profile page that displays key statistics and progress, while also serving as a learning exercise in GraphQL querying and SVG-based data visualization.

## Project Objective

- Learn and practice the GraphQL query language by building a real-world profile dashboard.
- Query and display your own data from the Zone01 GraphQL endpoint:  
  `https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql`
- Authenticate using your Zone01 credentials to access your personal data.
- Visualize your journey and achievements with interactive SVG graphs.

## Features

- **Authentication:**
  - Login with either username:password or email:password.
  - Secure JWT-based authentication; JWT is stored in local storage and used for all GraphQL queries.
  - Logout functionality.

- **Profile Dashboard:**
  - Displays at least three key pieces of information (e.g., user identification, XP amount, pass/fail ratio).
  - All data is fetched from the GraphQL API and is unique to the authenticated user.

- **Statistics & Graphs:**
  - At least two SVG-based graphs:
    - XP earned over time (progress graph)
    - Pass vs. Fail ratio (3D pie chart)
  - Responsive and visually appealing UI.

- **Data Sources:**
  - Uses the following tables from the GraphQL API:
    - `user`: Basic user information
    - `transaction`: XP and audit data
    - `progress` and `result`: Grades and progression
    - `object`: Project and exercise metadata

## Example GraphQL Queries

```graphql
# Get user ID and login
{
  user {
    id
    login
  }
}

# Get XP transactions
{
  transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
    amount
    createdAt
    object { name type }
  }
}

# Get pass/fail results
{
  result {
    grade
    createdAt
    user { id login }
  }
}
```

## Usage

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DavJesse/study-dash
   cd study-dash
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running Locally

Start the development server:
```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the app for production:
```sh
npm run build
# or
yarn build
```

### Deployment

This app is deployed on [Vercel](https://vercel.com/). You can view the live version here:

```
https://study-dash-z01-demo.vercel.app/
```

To deploy your own version, push your repository to GitHub and import it into Vercel. Vercel will automatically detect the Vite + React setup and handle the deployment.

## Authentication Details
- The login page accepts both username:password and email:password.
- Credentials are sent to `https://learn.zone01kisumu.ke/api/auth/signin` using Basic authentication (base64 encoded).
- On successful login, a JWT is stored in local storage and used as a Bearer token for all GraphQL queries.
- If credentials are invalid, an error message is displayed.

## Demo Mode
Use the following credetials to access demo mode:
username: demo
password: demo

## Customization
- You can modify the dashboard to display additional statistics or graphs by editing the relevant React components and GraphQL queries.
- The UI is built with Tailwind CSS and is fully responsive.

## License

This project is for educational purposes and is not officially affiliated with Zone01. Please use responsibly and do not share your credentials.
