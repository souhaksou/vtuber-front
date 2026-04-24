const BASE = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW';

export default function useGithubApi() {
  return {
    livestreamsAll: `${BASE}/livestreams/all.json`,
    trendingTop10: `${BASE}/trending-vtubers/livestream/10.json`,
    trendingTop100: `${BASE}/trending-vtubers/livestream/100.json`,
    vtubersTop10: `${BASE}/vtubers/10.json`,
    vtubersAll: `${BASE}/vtubers/all.json`,
  };
}
