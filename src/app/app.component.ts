import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RelevanceAIService } from './shared/relevanceai.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './models/chat-message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tube-research';
  userPrompt: string = ''; // Bind this to the input field
  mockTranscript: string = 'Your mock video transcript here...'; // Replace with your mock transcript
  messages: ChatMessage[] = [
    { content: "Message from User 1", sender: "User" },
    { content: "Message from AI 1", sender: "AI" },
    { content: "Message from User 2", sender: "User" },
  ];

  constructor(private relevanceAIService: RelevanceAIService){

  }

  onSubmit(): void {
    this.relevanceAIService.triggerRelevanceAI(this.mockTranscript, this.userPrompt)
      .subscribe(response => {
        console.log('Response from Relevance AI:', response);
        // Handle the response as needed
      }, error => {
        console.error('Error:', error);
      });
  }
}
