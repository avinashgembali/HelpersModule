import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  query = '';

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.updateQuery(this.query);
  }

  clearSearch() {
    this.query = '';
    this.searchService.updateQuery('');
  }
}