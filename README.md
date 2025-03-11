# Artillery Simple Report (VTF)

A modern, clean visualization tool for Artillery load test reports that provides an intuitive dashboard to analyze performance metrics.

![Artillery Report Visualization](https://cdn.jsdelivr.net/gh/othnielvtf/ArtillerySimpleReport@main/screenshot.png)

Demo: [Artillery Simple Report (VTF)](https://vtf-artillery-simple-report.vercel.app/)

## Features

- **Simple Upload Interface**: Drag and drop or select your Artillery JSON report file
- **Comprehensive Dashboard**: View all critical metrics in a clean, modern UI
- **Key Performance Indicators**: 
  - Virtual Users (created, completed, failed)
  - HTTP Metrics (requests, responses, request rate)
  - Response Time Analysis (median, 95th percentile, 99th percentile)
  - Status Code Distribution
- **Detailed Metrics Table**: Examine all performance data in a sortable, filterable table

## Technology Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/othnielvtf/ArtillerySimpleReport
cd ArtillerySimpleReport
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Run your Artillery load tests and generate a JSON report:
```bash
artillery run my-test.yml --output my-report.json
```

2. Open the Artillery Simple Report application
3. Upload your JSON report file
4. Analyze the visualized metrics and performance data

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Artillery](https://artillery.io/) for the amazing load testing tool
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
