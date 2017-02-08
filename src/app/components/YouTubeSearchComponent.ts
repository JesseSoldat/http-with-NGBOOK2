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

	search(query: string): any {
		let params: string = [
			`q=${query}`,
			`key=${this.apiKey}`,
			`part=snippet`,
			`type=video`,
			`maxResults=10`
		].join('&');

		let queryUrl: string = `${this.apiUrl}?${params}`;

		return this.http.get(queryUrl)
			.map( (res: Response) => {
				return (<any>res.json()).items.map(item => {
					console.log(item)
					return new SearchResult({
						id: item.id.videoId,
						title: item.snippet.title,
						description: item.snippet.description,
						thumbnailUrl: item.snippet.thumbnails.high.url
					});
				});
			});
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
	outputs: ['loading', 'results'],
	template: `
		<input type="text" class="form-control" placeholder="Search" autofoucs>

	`
})

export class SearchBox implements OnInit {
	loading: EventEmitter<boolean> = new EventEmitter<boolean>();
	results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

	constructor(private youtube: YouTubeService, private el: ElementRef){
		
	}
	
	ngOnInit(): void {
		Observable.fromEvent(this.el.nativeElement, 'keyup')
			.map( (e: any) => e.target.value)
			.filter( (text: string) => text.length > 1)
			.debounceTime(250)
			.map( (query: string) => this.youtube.search(query))
			.switch()
			.subscribe( (results: SearchResult[]) => {
				// console.log(results);
				this.results.next(results);
			}, (err: any) => {
				console.log(err);
			}, () => {

			});
	}
}

//-------------------------------------------------------
@Component({
	selector:'search-result',
	templateUrl: './search_result.html',
	inputs: ['result']
})

export class SearchResultComponent {
	result: SearchResult;
}

//-------------------------------------------------------
@Component({
	selector: 'youtube-search',
	templateUrl: './youtube_search.html'
})

export class YouTubeSearchComponent {
	results: SearchResult[];

	updateResults(results: SearchResult[]): void {
		this.results = results;

	}
}


