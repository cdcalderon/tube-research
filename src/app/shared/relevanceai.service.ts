import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelevanceAIResponse } from '../models/relevance-ai-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelevanceAIService {
  relevanceAiUrlBase = environment.relevanceAiUrlBase;
  transcriptApiUrl = environment.transcriptApiUrl;

  constructor(private http: HttpClient) {}

  triggerRelevanceAI(
    transcript: string,
    user_prompt: string
  ): Observable<RelevanceAIResponse> {
    const payload = {
      params: {
        transcript: transcript,
        user_prompt: user_prompt,
      },
      project: 'ed594377ff96-49bf-b2ab-5a728736595a',
    };

    return this.http.post<RelevanceAIResponse>(
      this.relevanceAiUrlBase,
      payload
    );
  }

  fetchTranscript(videoId: string): Observable<string> {
    return this.http.get(`${this.transcriptApiUrl}/${videoId}`, {
      responseType: 'text',
    });
  }
}
