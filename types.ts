
export enum AppView {
  LANDING = 'landing',
  SESSION = 'session',
  DASHBOARD = 'dashboard',
}

export interface UserStoryData {
  story: string;
  mood?: string;
}

export interface HealingResult {
  sessionTitle: string;
  metaphor: string;
  comicCaption: string;
  mentorSageInsight: string;
  stressLevelChange: number;
}
