import React, {useState} from 'react'

export default function SearchNews({searchNews}) {
	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		searchNews(text);
	}

	return (
		<div>
			<div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
			<form className="w-full max-w-sm" onSubmit={onSubmit}>
				<div className="flex items-center border-b border-b-2 border-pink-500 py-2">
					<input onChange={e => setText(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Mau cari topik apa skuyy" />
					<button className="flex-shrink-0 bg-pink-500 hover:bg-pink-700 border-pink-500 hover:border-pink-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
						Cari
					</button>
				</div>
			</form>
		</div>
		</div>
	)
}