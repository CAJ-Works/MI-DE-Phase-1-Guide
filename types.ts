export type OptionKey = 'a' | 'b' | 'c';

export interface Option {
  key: OptionKey;
  text: string;
}

export type DiagramType = 'exit_ramp' | 'road_lines';

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswer: OptionKey;
  hasDiagram?: boolean;
  diagramType?: DiagramType;
}

export type AppMode = 'menu' | 'practice' | 'test';

export interface UserAnswers {
  [questionId: number]: OptionKey;
}