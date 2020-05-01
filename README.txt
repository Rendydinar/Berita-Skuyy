Latihan membuat applikasi berita dengan implementasi dari latihan react hooks oleh Sastra Nababan.

Data berita diambil dari API https://newsapi.org/.

Goals:
 1. Request Top Headline from https://newsapi.ord
 2. Show loading message while fetching
 3. Handle error
 4. Complete functionality of 'Load More' & 'Refresh' button.

Overview NEWSAPI

News API is a simple HTTP REST API for searching and retrieving live articles from all over the web. It can help you answer questions like:

What top stories is the NY Times running right now?
What new articles were published about the next iPhone today?
Has my company or product been mentioned or reviewed by any blogs recently?
You can search for articles with any combination of the following criteria:

Keyword or phrase. Eg: find all articles containing the word 'Microsoft'.
Date published. Eg: find all articles published yesterday.
Source name. Eg: find all articles by 'TechCrunch'.
Source domain name. Eg: find all articles published on nytimes.com.
Language. Eg: find all articles written in English.
You can sort the results in the following orders:
	- Date published
	- Relevancy to search keyword
	- Popularity of source

API ENDPOINT:

ERROR EXAMPLE: 
	{
	"status": "error",
	"code": "apiKeyMissing",
	"message": "Your API key is missing. Append this to the URL with the apiKey param, or use the x-api-key HTTP header."
	}



Request parameters
country
The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za . Note: you can't mix this param with the sources param.

category
The category you want to get headlines for. Possible options: business entertainment general health science sports technology . Note: you can't mix this param with the sources param.

sources
A comma-seperated string of identifiers for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index. Note: you can't mix this param with the country or category params.

q
Keywords or a phrase to search for.

pageSize
int
The number of results to return per page (request). 20 is the default, 100 is the maximum.

page
int
Use this to page through the results if the total results found is greater than the page size.

apiKey
REQUIRED
Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.

Response object
status
string
If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.

totalResults
int
The total number of results available for your request.

articles
array[article]
The results of the request.

source
object
The identifier id and a display name name for the source this article came from.

author
string
The author of the article

title
string
The headline or title of the article.

description
string
A description or snippet from the article.

url
string
The direct URL to the article.

urlToImage
string
The URL to a relevant image for the article.

publishedAt
string
The date and time that the article was published, in UTC (+000)

content
string
The unformatted content of the article, where available. This is truncated to 260 chars for Developer plan users.

1. Top headlines /v2/top-headlines
This endpoint provides live top and breaking headlines for a country, specific category in a country, single source, or multiple sources. You can also search with keywords. Articles are sorted by the earliest date published first.

This endpoint is great for retrieving headlines for display on news tickers or similar.

2. Everything /v2/everything
Search through millions of articles from over 50,000 large and small news sources and blogs. This includes breaking news as well as lesser articles.

This endpoint suits article discovery and analysis, but can be used to retrieve articles for display, too.

3. Sources /v2/sources
This endpoint returns the subset of news publishers that top headlines (/v2/top-headlines) are available from. It's mainly a convenience endpoint that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users.


sumber:
- detik.com
- kompas.com
- liputan6.com
- cnn.com

Sub-categories:
- business 
- entertainment 
- health 
- science 
- sports 
- technology

country:
- id
- us
font-family: 'Pacifico', cursive;

endpoint kategori: http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e2786195264d4f26abf5ad4b2b4733d8
endpoint sumber: http://newsapi.org/v2/everything?domains=wsj.com&apiKey=e2786195264d4f26abf5ad4b2b4733d8
endpoint country: http://newsapi.org/v2/top-headlines?country=us&apiKey=e2786195264d4f26abf5ad4b2b4733d8


