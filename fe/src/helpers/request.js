import $ from 'jquery'
const host = 'http://localhost:9000'

export const get = (route) => {
	const url = host + route
	return new Promise((resolve, reject) => {	
		$.ajax({
			url: url,
			type: "GET",
			beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
			success: function(response) { 
				resolve(response)
			},
			error: function(err){
				reject(err)
			}
		});
	})
}

export const post = (route, dataIn) => {
	const url = host + route
	return new Promise((resolve, reject) => {
		$.ajax({
			url: url,
			type: "POST",
			data: dataIn,
			beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
			success: function(response) { 
				resolve(response)
			},
			error: function(err){
				reject(err)
			}
		});
	})
}

export const del = (route) => {
	const url = host + route
	return new Promise((resolve, reject) => {
		$.ajax({
			beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
		    url: url,
		    type: 'DELETE',
		    success: function(data) {
		        resolve(data)
		    },
		    fail: function(err) {
		    	reject(err)
		    }
		});
	})
}