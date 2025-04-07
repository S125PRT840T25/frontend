# Student Feedback Analyser

## Prerequisites
- Node.js (>=14.x)
- npm or yarn

## Getting Started

### Clone the repository:

```sh
git clone <repository_url>
cd <project_directory>
npm install
# or
yarn install

npm run dev
# or
yarn dev

## Project Structure

src/
├──api/                      # API related components including configurations, queries, and mutations
|   ├──mutations/            # Mutations (ex- to modify data) 
|   ├──queries/              # Queries (ex- to retireve data)
|   ├──api-config.ts         # API path configurations
|   └─axios.ts               # Axios object to make api calls
├──components/               # Re-usable components
├──layouts/                  # UI templates
├──pages/                    # Pages or modules
├──redux/                    # State management (ex - slices)
├──variables.css             # Common css values (ex- Theme colors, and font sizes)
└──app.tsx                    # Main application entry point
