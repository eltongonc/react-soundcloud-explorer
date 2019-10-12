//SOUNDCLOUD_API
class SOUNDCLOUD {
	clientId = 'E9bvER0kSJUJFDHCllZ3IL5h18C7QICR';
	search = 'random';
	limit =  '60'

	url(songId){
		// More info: https://developers.soundcloud.com/docs/api/reference#tracks
		if (songId) {
			return `https://api.soundcloud.com/tracks${songId}?client_id=${this.clientId}`;
		}else{
			return `https://api.soundcloud.com/tracks?client_id=${this.clientId}&limit=${this.limit}&q=${this.search}`;
		}
	}
};

export default SOUNDCLOUD;