export interface RelevanceAIResponse {
  status:        string;
  errors:        any[];
  output:        Output;
  credits_used:  CreditsUsed[];
  executionTime: number;
  cost:          number;
}

export interface CreditsUsed {
  credits:      number;
  name:         string;
  multiplier?:  number;
  num_units?:   number;
  tool_run_id?: string;
  tool_name?:   string;
  tool_id?:     string;
}

export interface Output {
  answer: string;
}
