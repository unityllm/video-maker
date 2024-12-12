export interface VideoPage {
  id: string;
  title: string;
  text: string;
  backgroundColor: string;
  duration: number;
}

export interface VideoProject {
  pages: VideoPage[];
  currentPageIndex: number;
}