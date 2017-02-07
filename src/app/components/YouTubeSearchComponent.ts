import { Component, OnInit, Inject, Injectable, ElementRef, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

class SearchResult {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;

	constructor(obj?: any) {
		this.id            = obj && obj.id           || null;
		this.title         = obj && obj.title        || null;
		this.description   = obj && obj.description  || null;
		this.thumbnailUrl  = obj && obj.thumbnailUrl || null;
    this.videoUrl      = obj && obj.videoUrl     || `https://www.youtube.com/watch?v=${this.id}`;
	}
}

@Injectable()
export class YouTubeService {
	constructor(private http: Http,
		@Inject(YOUTUBE_API_KEY) private apiKey: string,
		@Inject(YOUTUBE_API_URL) private apiUrl: string){

	}

	search() {

	}
}

export var youTubeServiceInjectables: Array<any> = [
  {provide: YouTubeService, useClass: YouTubeService},
  {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
  {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
];
//-------------------------------------------------------
@Component({
	selector: 'search-box',
	template: `
		<input type="text" class="form-control" placeholder="Search" autofoucs>

	`
})

export class SearchBox implements OnInit {
	
	ngOnInit(): void {

	}
}

//-------------------------------------------------------
@Component({
	selector:'search-result',
	templateUrl: './search_result.html'
})

export class SearchResultComponent {

}

//-------------------------------------------------------
@Component({
	selector: 'youtube-search',
	templateUrl: './youtube_search.html'
})

export class YouTubeSearchComponent {

}


