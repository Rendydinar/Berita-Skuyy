import React from 'react'

export default function Header({isLoading, setIndonesiaNews, setEnglishNews, setIndonesiaKategoriNews, setMediaMassaNews}) {
	return (
		<React.Fragment>
	      <div className="text-center mt-3">
		      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Berita Utama Skuyy</h3> 
		    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={setIndonesiaNews}>Indonesia</button>
		    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={setEnglishNews}>Internasional</button>
		</div>

	      <div className="text-center mt-3">
		      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Ketegori Berita Indonesia Skuyy</h3> 
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('business')}>Bisnis</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('technology')}>Teknologi</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('sports')}>Olahraga</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('science')}>Sains</button>      
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('health')}>Kesehatan</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setIndonesiaKategoriNews('entertainment')}>Entertainment</button>
				 </div>

	      <div className="text-center mt-3">
		      <h3 className="text-lg text-pink-600" style={{fontFamily: 'Montserrat'}} >Pilih Berita Dari Media Terbaik Skuyy</h3> 
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('cnn.com')}>CNN Internasial</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('detik.com')}>Detik.com</button>
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('kompas.com')}>Kompas.com</button>      
				    <button className="w-auto bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-pink-700 mr-2" onClick={() => setMediaMassaNews('liputan6.com')}>Liputan6.com</button>
				 </div>

	      {isLoading && <p className="text-3xl text-center text-pink-600 style={{fontFamily: 'Montserrat'}}"> Lagi Loading skuyy 🤗 ... </p>}
			
		</React.Fragment>
	)
}












