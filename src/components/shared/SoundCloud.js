import axios from 'axios';

//SOUNDCLOUD_API
class SOUNDCLOUD {
	clientId = 'E9bvER0kSJUJFDHCllZ3IL5h18C7QICR';
	search = 'random';
	limit =  '60'

	url(songId){
		// More info: https://developers.soundcloud.com/docs/api/reference#tracks
		if (songId) {
			return `https://api.soundcloud.com/tracks/${songId}?client_id=${this.clientId}`;
		}else{
			return `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`;
		}
	}

	async getList() {
		try {
			const result = await axios({
				method: 'GET',
				url: this.url(),
			});

			return result.data
		} catch(e) {
			console.log('error at getlist', e);
		}
	}

	async getSong({id, query}) {
		try {
			const result = await axios({
				method: 'GET',
				url: this.url(id),
			});

			return result.data
		} catch(e) {
			console.log('error at getlist', e);
		}
	}
};

export default SOUNDCLOUD;