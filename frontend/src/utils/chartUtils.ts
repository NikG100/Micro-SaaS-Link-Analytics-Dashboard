import { Analytics } from '../types';

export const processTimeData = (analytics: Analytics[]) => {
  const timeMap = new Map<string, number>();
  
  analytics.forEach((entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    timeMap.set(date, (timeMap.get(date) || 0) + 1);
  });

  return {
    labels: Array.from(timeMap.keys()),
    data: Array.from(timeMap.values()),
  };
};

export const processDeviceData = (analytics: Analytics[]) => {
  const deviceMap = new Map<string, number>();
  
  analytics.forEach((entry) => {
    const device = entry.device.split(' ')[0];
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
  });

  return {
    labels: Array.from(deviceMap.keys()),
    data: Array.from(deviceMap.values()),
  };
};

export const processBrowserData = (analytics: Analytics[]) => {
  const browserMap = new Map<string, number>();
  
  analytics.forEach((entry) => {
    const browser = entry.browser.split(' ')[0];
    browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
  });

  return {
    labels: Array.from(browserMap.keys()),
    data: Array.from(browserMap.values()),
  };
}; 