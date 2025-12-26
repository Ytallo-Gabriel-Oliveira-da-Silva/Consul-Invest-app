// Configuration for Google AdMob
export const ADMOB_IDS = {
  APP_ID: 'ca-app-pub-9591343117541628~7091106586',
  BANNER: 'ca-app-pub-9591343117541628/2779685858',
  REWARDED: 'ca-app-pub-9591343117541628/5318041679'
};

export const logAdEvent = (type: string, id: string) => {
  console.log(`[AdMob System] ${type} Event Triggered for Unit ID: ${id}`);
};
