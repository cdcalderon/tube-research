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
  youtubeUrl: string = 'https://www.youtube.com/watch?v=AbCTlemwZ1k';
  transcript: string = '';
  userPrompt: string = 'summarize';
  messages: ChatMessage[] = [
    { content: "Message from User 1", sender: "User" },
    { content: "Message from AI 1", sender: "AI" },
    { content: "Message from User 2", sender: "User" },
  ];

  constructor(private relevanceAIService: RelevanceAIService){

  }

  onSubmit(): void {
    const videoId = this.extractVideoId(this.youtubeUrl);
    if (videoId) {
      this.relevanceAIService.fetchTranscript(videoId).subscribe(transcript => {
        this.processTranscript(transcript);
      }, error => {
        console.error('Error fetching transcript:', error);
      });
    } else {
      console.error('Invalid YouTube URL');
    }
  }

  private processTranscript(transcript: string): void {
    if (!this.userPrompt.trim()) {
      return; // Avoid sending empty messages
    }

    // Add the user's message to the chat
    this.messages.push({ content: this.userPrompt, sender: 'User' });

    this.relevanceAIService.triggerRelevanceAI(transcript, this.userPrompt)
      .subscribe(response => {
        // Extract the 'answer' from the response and add it as an AI message
        if (response.output && response.output.answer) {
          this.messages.push({ content: response.output.answer, sender: 'AI' });
        }
      }, error => {
        console.error('Error:', error);
        // Optionally handle errors, e.g., display an error message
      });

    this.userPrompt = '';
  }

  private extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
  }



}
