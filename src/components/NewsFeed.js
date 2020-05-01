/*eslint-disable no-unused-vars*/
import React, {useState, useEffect} from 'react'
// import SearchNews from './SearchNews';
import authorDefaultIMG from '../img/136-1366211_group-of-10-guys-login-user-icon-png.png'
import moment from 'moment-timezone'

const defaultNews = {
	status: 'ok',
	totalResults: 0,
	articles: [],
}

const endpoint = {
	headline: 'http://newsapi.org/v2/top-headlines',
	everything: 'https://newsapi.org/v2/everything',
	source: 'https://newsapi.org/v2/sources'
}
// http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e2786195264d4f26abf5ad4b2b4733d8
// // const endpoint = "http://newsapi.org/v2/top-headlines?country=us&apiKey=e2786195264d4f26abf5ad4b2b4733d8"

export default function NewsFeed() {
	const newsDefaultIMG = "https://firebasestorage.googleapis.com/v0/b/unkriswina-informers.appspot.com/o/assets%2Fimg%2Fphoto-1504711434969-e33886168f5c.jpeg?alt=media&token=1ed3c3d2-6627-4fbc-8b1f-1df7aaa298e6"
	const	[news, setNews] = useState(defaultNews);
	const [newsTitle, setNewTitle] = useState('TOP Berita Utama Indonesia HARI INI!');
	const [articleEndPoint, setArticleEndPoint] = useState('FindByTopHeadlineCountry')
	const	[mediaMassa, setMediaMassa] = useState('');
	const	[category, setCategory] = useState('');
	const	[country, setCountry] = useState('id');
	const	[page, setPage] = useState(1);
	const	[isLoading, setLoading] = useState(false);
	const	[isError, setError] = useState(false);
	const	[isRefresh, setRefresh] = useState(false);
	const [clearArticle, setClearArticle] = useState(false);	

	const handleRefresh = () => {
		setPage(1)
		setLoading(false)
		setRefresh(false)
	}

	const setEnglishNews = () => {
		setClearArticle(true)
		setArticleEndPoint('FindByTopHeadlineCountry')
		setNewTitle(`TOP Berita Utama Internasional HARI INI!`)
		setCountry('us')
		setPage(1)
	}

// - business 
// - entertainment 
// - health 
// - science 
// - sports 
// - technology
	const setIndonesiaNews = () => {
		setClearArticle(true)
		setNewTitle(`TOP Berita Utama Indonesia HARI INI!`)
		setArticleEndPoint('FindByTopHeadlineCountry')
		setCountry('id')
		setPage(1)
	}

	const setIndonesiaKategoriNews = (kategori) => {
		setClearArticle(true)
		setCategory(kategori)
		setArticleEndPoint('FindByCategory')
		setNewTitle(`TOP Berita ${kategori} Indonesia!`)
		setCountry('id')
		setPage(1)
	}

	const setMediaMassaNews = (mediaMassaText) => {
 		setClearArticle(true)
		setMediaMassa(mediaMassaText)
		setNewTitle(`TOP Berita ${mediaMassaText} HARI INI!`)
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
						const urlToFetch = `${endpoint.headline}?country=${country}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`; 
						const response = await fetch(urlToFetch);
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
						const urlToFetch = `http://newsapi.org/v2/everything?domains=${mediaMassa}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`; 
						const response = await fetch(urlToFetch);
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
						const urlToFetch = `http://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&page=${page}`; 
						const response = await fetch(urlToFetch);
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
      <h3 className="text-4xl m-4 text-center text-pink-600" style={{fontFamily: 'Pacifico'}} >BERITA SKUYY</h3> 

      <div className="text-center mb-2">
	      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Berita Utama Skuyy</h3> 
		    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={setIndonesiaNews}>Indonesia</button>
		    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={setEnglishNews}>Internasional</button>
			</div>

      <div className="text-center mb-2">
	      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Ketegori Berita Indonesia Skuyy</h3> 
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('business')}>Bisnis</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('technology')}>Teknologi</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('sports')}>Olahraga</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('science')}>Sains</button>      
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('health')}>Kesehatan</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('entertainment')}>Entertainment</button>
			 </div>

      <div className="text-center mb-2">
	      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Berita Dari Media Terbaik Skuyy</h3> 
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('cnn.com')}>CNN Internasial</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('detik.com')}>Detik.com</button>
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('kompas.com')}>Kompas.com</button>      
			    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('liputan6.com')}>Liputan6.com</button>
			 </div>

      {isLoading && <p className="text-3xl text-center text-pink-600 style={{fontFamily: 'Montserrat'}}"> Lagi Loading skuyy 🤗 ... </p>}


      {
      	isError ? <p className="text-3xl text-center text-pink-600 style={{fontFamily: 'Montserrat'}}"> Maaf skuyy lagi terjadi masalah 🙈 coba ulang aja skuyy 😅 </p> : 
      	(
      		<div>
			      <h3 className="text-2xl font-bold text-center my-4 text-pink-600" style={{fontFamily: 'Montserrat'}} >{newsTitle}</h3>
			    	<div className="flex flex-wrap">
				    	{news.articles.map((article, i) => ( 
								<div key={i} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-4 px-2">
								  <div className="h-48 w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${article.urlToImage||newsDefaultIMG})`}} title={article.title}>
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
								    <button className="mt-4 bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 font-bold rounded inline-flex items-center">
											<svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 4V18C2 18 2 20 4 20H20C20 20 22 20 22 18V4H2M9 13H5V7H9V13M19 13H11V11H19V13M19 9H11V7H19V9Z"/>
											</svg>
										  <a href={article.url} target="_blank" rel="noopener">Baca Ahh</a>
										</button>
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



							
