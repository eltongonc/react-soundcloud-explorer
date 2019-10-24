import axios from 'axios';

//SOUNDCLOUD_API
class SOUNDCLOUD {
	clientId = 'E9bvER0kSJUJFDHCllZ3IL5h18C7QICR';
	search = 'random';
	limit =  '59'

	url(songId){
		// More info: https://developers.soundcloud.com/docs/api/reference#tracks
		if (songId) {
			return `https://api.soundcloud.com/tracks/${songId}?client_id=${this.clientId}`;
		}else{
			return ;
		}
	}

	async getList() {
		try {
			const result = await axios({
				method: 'GET',
				url: `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`,
			});

			return result.data
		} catch(e) {
			console.log('error at getlist', e);
		}
	}

	async searchSong(query) {
		try {
			const result = await axios({
				method: 'GET',
				url: `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${query}`,
			});

			return result.data
		} catch(e) {
			console.log('error at getlist', e);
		}
	}
};

export default SOUNDCLOUD;