import { Injectable, inject } from '@angular/core';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD2eaX01Tq3K4D142DORyEeGXkUPgRc77g',
  authDomain: 'bids-dashboard.firebaseapp.com',
  projectId: 'bids-dashboard',
  storageBucket: 'bids-dashboard.appspot.com',
  messagingSenderId: '469089349837',
  appId: '1:469089349837:web:725a970f63317165cdf984',
  measurementId: 'G-YCPPYWTB86',
};

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app: FirebaseApp;
  private analytics?: Analytics;

  constructor() {
    this.app = initializeApp(firebaseConfig);

    // Analytics is only available in browser environments
    isSupported().then((supported) => {
      if (supported) {
        this.analytics = getAnalytics(this.app);
      } else {
        console.warn('Firebase Analytics not supported in this environment');
      }
    });
  }

  getAnalyticsInstance(): Analytics | undefined {
    return this.analytics;
  }
}
