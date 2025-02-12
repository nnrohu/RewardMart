# RewardMart - React Native E-commerce App with Interactive Game

A modern e-commerce mobile application built with React Native, featuring an engaging interactive game that rewards users with promotional discounts.

## Features

- Home Screen with banner slider and product listings
- Detailed product pages with image carousel
- Shopping cart functionality
- Interactive game for customer engagement
- Bottom tab navigation
- State management using Redux
- Mock API integration using json-server

## Prerequisites

- Node.js >= 14
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)

## Setup Instructions

1. Clone the repository:

```bash
git clone [repository-url]
cd RewardMart
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

4. Start the mock API server:

```bash
npm run start-server
# or
yarn start-server
```

5. Run the application:

For iOS:

```bash
npm run ios
# or
yarn ios
```

For Android:

```bash
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable components
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── store/         # Redux store configuration and slices
├── services/      # API services
├── game/          # Interactive game components
└── utils/         # Utility functions and constants
```

## Technologies Used

- React Native
- Redux Toolkit
- React Navigation
- Axios
- json-server
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
