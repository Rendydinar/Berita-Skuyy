/*eslint-disable no-unused-vars*/
import React, {useState, useEffect} from 'react'
import authorDefaultIMG from '../img/136-1366211_group-of-10-guys-login-user-icon-png.png'
import moment from 'moment-timezone'
import Header from './Header';

const defaultNews = {
	status: 'ok',
	totalResults: 0,
	articles: [],
}

const endpoint = {
	headline: 'https://newsapi.org/v2/top-headlines',
	everything: 'https://newsapi.org/v2/everything',
}

export default function NewsFeed() {
	const newsDefaultIMG = "https://firebasestorage.googleapis.com/v0/b/unkriswina-informers.appspot.com/o/assets%2Fimg%2Fphoto-1504711434969-e33886168f5c.jpeg?alt=media&token=1ed3c3d2-6627-4fbc-8b1f-1df7aaa298e6"
	const [news, setNews] = useState(defaultNews);
	const [newsTitle, setNewTitle] = useState('Top Berita Utama Indonesia Hari ini!');
	const [articleEndPoint, setArticleEndPoint] = useState('FindByTopHeadlineCountry')
	const [mediaMassa, setMediaMassa] = useState('');
	const [category, setCategory] = useState('');
	const [country, setCountry] = useState('id');
	const [page, setPage] = useState(1);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [isRefresh, setRefresh] = useState(false);
	const [clearArticle, setClearArticle] = useState(false);	

	const handleRefresh = () => {
		setPage(1)
		setLoading(false)
		setRefresh(false)
	}

	const setEnglishNews = () => {
		setClearArticle(true)
		setArticleEndPoint('FindByTopHeadlineCountry')
		setNewTitle(`Top Berita Utama Internasional Hari ini!`)
		setCountry('us')
		setPage(1)
	}

	const setIndonesiaNews = () => {
		setClearArticle(true)
		setNewTitle(`Top Berita Utama Indonesia Hari ini!`)
		setArticleEndPoint('FindByTopHeadlineCountry')
		setCountry('id')
		setPage(1)
	}

	const setIndonesiaKategoriNews = (kategori) => {
		setClearArticle(true)
		setCategory(kategori)
		setArticleEndPoint('FindByCategory')
		setNewTitle(`Top Berita ${kategori} Indonesia!`)
		setCountry('id')
		setPage(1)
	}

	const setMediaMassaNews = (mediaMassaText) => {
 		setClearArticle(true)
		setMediaMassa(mediaMassaText)
		setNewTitle(`Top Berita ${mediaMassaText} Hari ini!`)
		setArticleEndPoint('FindBySumber')
 		setPage(1)
	}

	const gotoLink = (link) => {
		window.location.href = link;
	}


	useEffect(() => {
		const fetchData = async () => {
			// loading handle
			setLoading(true)
			if(clearArticle) {
				setNews(defaultNews)
				setClearArticle(false)
			}
			console.log(articleEndPoint)
			switch (articleEndPoint) {
				case 'FindByTopHeadlineCountry':
					console.log('FindByTopHeadlineCountry');
					try {
						const response = await fetch(`${endpoint.headline}?country=${country}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`);
						const result =  await response.json();
						console.log(result);
						setNews(current => {
							return(
								{
									...result,
									articles: [...current.articles, ...result.articles],
									totalResults: result.totalResults,
									status: result.status,
									articleEndPoint: 'FindByTopHeadlineCountry'
								}
							)
						})
						if(result.status !== 'ok') {
							throw new Error('error')
						}
					} catch(err) {
						setError(true)
					}
					break;
				case 'FindBySumber':
					console.log('FindBySumber');
					try {
						const response = await fetch(`${endpoint.everything}?domains=${mediaMassa}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`);
						const result =  await response.json();
						
						setNews(current => {
							return(
								{
									...result,
									articles: [...current.articles, ...result.articles],
									totalResults: result.totalResults,
									status: result.status
								}
							)
						})
						if(result.status !== 'ok') {
							throw new Error('error')
						}
					} catch(err) {
						setError(true)
					}
					break;
				case 'FindByCategory':
					console.log('FindByCategory');
					try {
						const response = await fetch(`${endpoint.headline}?country=id&category=${category}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`);
						const result =  await response.json();
						
						setNews(current => {
							return(
								{
									...result,
									articles: [...current.articles, ...result.articles],
									totalResults: result.totalResults,
									status: result.status
								}
							)
						})
						if(result.status !== 'ok') {
							throw new Error('error')
						}
					} catch(err) {
						setError(true)
					}
					break;
				default:
					break;							
			}
			setLoading(false)
		}

		fetchData() 
	}, [page, isRefresh, country, mediaMassa, category])

  return (
    <div className="mb-auto">
      <MemoizedHeaderComponent 
      	isLoading={isLoading}
      	setIndonesiaNews={setIndonesiaNews}
      	setEnglishNews={setEnglishNews}
      	setIndonesiaKategoriNews={setIndonesiaKategoriNews}
      	setMediaMassaNews={setMediaMassaNews}
      ></MemoizedHeaderComponent>

      {
      	isError ? <p className="text-3xl text-center text-pink-600 style={{fontFamily: 'Montserrat'}}"> Maaf skuyy lagi terjadi masalah 🙈 coba ulang aja skuyy 😅 </p> : 
      	(
      		<div>
				    <h3 className="text-2xl font-bold text-center my-4 text-pink-600" style={{fontFamily: 'Montserrat'}} >{newsTitle}</h3>
			    	<div className="flex flex-wrap">
				    	{news.articles.map((article, i) => ( 
								<div key={i} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-4 px-2">
								  <div style={{backgroundImage: `url(${article.urlToImage||newsDefaultIMG})`}} className="h-48 w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={article.title}>
								  </div>
								  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
								    <div className="mb-8">	    
								      <p className="text-sm text-gray-600 flex items-center">
								        <svg className="fill-current text-gray-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								          <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
								        </svg>
												{article.source.name}
								      </p>
								      <div className="text-gray-900 font-bold text-xl mb-2">{article.title}</div>
								      <p className="text-gray-700 text-base">{article.description}</p>
								    </div>
								    <div className="flex items-center">
								      <img className="w-10 h-10 rounded-full mr-4" src={authorDefaultIMG} alt={article.author} />
								      <div className="text-sm">
								        <p className="text-gray-900 leading-none">{article.author || article.source.name}</p>
								        <p className="text-gray-600">{moment(article.publishedAt).tz('Asia/Makassar').format('LLL')}</p>
								      </div>	
								    </div> 
 										  <a href={article.url} target="_blank" rel="noopener" className="mt-4 bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 font-bold rounded inline-flex items-center">
												<svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4V18C2 18 2 20 4 20H20C20 20 22 20 22 18V4H2M9 13H5V7H9V13M19 13H11V11H19V13M19 9H11V7H19V9Z"/>
												</svg>
 										  	<span>Baca Ahh</span>
 										  </a>
								  </div>
								</div>			
				    	))}
				    </div>
			    	<div className="container text-center">
				      {
				      	news.articles.length < parseInt(news.totalResults) ? (
			      			<button
										className="mt-4 mr-4 w-auto bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded-full"

			      			  disabled={isLoading}
			      			  onClick={() => setPage(c => c+1)}
			      			>Load More</button>
			      		) : null
				      } 
				      <button 
								className="mt-4 mr-4 w-auto bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded-full"
				      	onClick={handleRefresh}
				      >Refresh ahh</button>
			    	</div>
      		</div>
      	)
      }
    </div>
  );
};

const MemoizedHeaderComponent = React.memo(Header); // membuat ChildComponent hanya akan re-render jika terjadi perubahan dalam ChildComponent

