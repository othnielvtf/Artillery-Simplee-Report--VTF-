export interface ArtilleryReport {
  aggregate: {
    counters: {
      'vusers.created': number;
      'vusers.completed': number;
      'vusers.failed': number;
      'http.requests': number;
      'http.codes.200': number;
      'http.responses': number;
      [key: string]: number;
    };
    rates: {
      'http.request_rate': number;
      [key: string]: number;
    };
    summaries: {
      'http.response_time': {
        min: number;
        max: number;
        count: number;
        mean: number;
        median: number;
        p95: number;
        p99: number;
      };
      [key: string]: {
        min: number;
        max: number;
        count: number;
        mean: number;
        median: number;
        p95: number;
        p99: number;
      };
    };
  };
}