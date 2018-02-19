import Component from '@ember/component';

export default Component.extend({
	email:'',
	resultEmail:'',
	result:'',

	lastNameChanged: Ember.observer('email', function() {
		this.set('emailError','');
	}),

	actions:{
		submitClick:function(){
			var emailExpression = /\S+@\S+\.\S+/;
			
			if(Ember.isEmpty(this.get('email'))){
				this.set('emailError','Please enter email.');
			} else {
				if( emailExpression.test(this.get('email')) ){
					this.set('result', '');
					this.set('resultEmail', this.get('email'));
					this.send('clearvalues');
					this.send('ajaxCaller', this.get('resultEmail'));
				} else {
					this.set('emailError','Please enter a valid email.');
				}				
			}

			// alert(this.get('email'));
		},
		clearvalues:function(){
			this.set('email','');
			this.set('emailError','');
		},
		ajaxCaller:function(email){
			var self = this;
			var param = {
						  "emailId": email
						};
			jQuery.ajax
			({
				type: 'POST',
				url: 'http://surya-interview.appspot.com/list',
				dataType: 'json',
				async: true,
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(param),
				cache: false,
				crossDomain: true,
				beforeSend: function(xhr) {
					// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				},

				success: function (response) 
				{
					// alert(JSON.stringify(response));
					self.set('result', response.items);
				},

				complete:function()
				{
				},

				error:function(xhr,status,error){
		            alert(status);
		        }

			}).fail(function()
			{
			});

		},
	},
});
