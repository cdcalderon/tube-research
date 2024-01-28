import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelevanceAIResponse } from '../models/relevance-ai-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelevanceAIService {
relevanceAiUrlBase = 'https://api-bcbe5a.stack.tryrelevance.com/latest/studios/7557f99d-b7a4-4e28-b181-c73de1598a2c/trigger_limited'
transcriptApiUrl = 'http://localhost:3000/transcript'; // Add your API base URL here

  constructor(private http: HttpClient) {

  }

  triggerRelevanceAI(transcript: string, user_prompt: string): Observable<RelevanceAIResponse> {
    const payload = {
      params: {
        transcript: transcript,
        user_prompt: user_prompt
      },
      project: 'ed594377ff96-49bf-b2ab-5a728736595a'
    };

    return this.http.post<RelevanceAIResponse>(this.relevanceAiUrlBase, payload);
  }

  fetchTranscript(videoId: string): Observable<string> {
    return this.http.get(`${this.transcriptApiUrl}/${videoId}`, { responseType: 'text' });
  }
}
