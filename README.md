# Health

A PWA for monitoring health and body statistics

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Firebase deployment

Run firebase deploy to put built app to firebase hosting. Be sure to have firebase settings in environment file. These files are not stored in git repository - for security reasons.

e.g. environment.prod.ts
export const environment = {
production: true,
firebase: {
apiKey: "Firebase API Key",
authDomain: "Firebase Auth Domain",
databaseURL: "Firebase DB URL",
projectId: "Firebase Project Id",
storageBucket: "Firebase storage bucket",
messagingSenderId: "Firebase Message Sender Id"
}
};
