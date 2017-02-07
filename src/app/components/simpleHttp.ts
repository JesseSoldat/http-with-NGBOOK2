import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
	selector: 'simple-http',
	template: `
	<h2>Basic Requests</h2>
	<hr>
	<button type="button" (click)="makeRequest()">MakeRequest</button>
	<button type="button" (click)="makePost()">MakePost</button>
	<button type="button" (click)="makeDelete()">MakeDelete</button>
  <button type="button" (click)="makeHeaders()">Make Headers</button>
	<hr>
	<div *ngIf="loading">loading...</div>
	<pre>{{data | json}}</pre>
	


	`
})
export class SimpleHTTPComponent {
	data: Object;
	loading: boolean;

	constructor(private http: Http){

	}
	makeRequest(): void {
		this.loading = true;
		this.http.request('http://jsonplaceholder.typicode.com/posts/1')
			.subscribe((res: Response) => {
				this.data = res.json();
				this.loading = false;
			});
	}

	makePost(): void {
		this.loading = true;
		this.http.post(
			'http://jsonplaceholder.typicode.com/posts',
			JSON.stringify({
				body: 'Welcome to learning @ JLab!',
				title: 'JLab',
				userId: 1
			})
		).subscribe((res: Response) => {
			console.log(res);
			this.data = res.json();
			this.loading = false;
		});
	}

	makeDelete(): void {
		this.loading = true;
		this.http.delete('http://jsonplaceholder.typicode.com/posts/1')
			.subscribe((res: Response) => {
				console.log(res);
				this.data = res.json();
				this.loading = false;
			});
	}

	makeHeaders(): void {
    this.loading = true;

		let headers: Headers = new Headers();
		headers.append('X-API-TOKEN', 'ng-book');

		let opts: RequestOptions = new RequestOptions();
		opts.headers = headers;

		this.http.get('http://jsonplaceholder.typicode.com/posts/1', opts)
			.subscribe((res: Response) => {
				this.data = res.json();
        this.loading = false;
				
			})
	}
}