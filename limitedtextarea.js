//	Limited TextArea v0.3 by Jae Hess - http://jaehess.com 12/21/06
//	Inspired by Lokesh's Lightbox http://huddletogether.com/projects/lightbox2/
//	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
//	I am sure this script is not perfect. Please email fixes, suggestions to jae.hess@gmail.com
/*
 USAGE:
	
	1.) Include this script after Prototype in the HEAD section of your HTML page
	
	<script src="/javascripts/prototype.js" type="text/javascript"></script>	
	<script src="/javascripts/limitedtextarea.js" type="text/javascript"></script>
	
	2.) Choose your implementation method
		
		A.) Unobtrusive (silent):
		Add the "rel" attribute to your textarea tag with a value of "limited". This will limit the textarea to default of 300 words.
		Example:
		<textarea cols="40" id="comment" name="comment" rel="limited" rows="20"></textarea>
		
		Adding "limited[##]" will allow you to override the limit on that textarea.
		Example:
		<textarea cols="40" id="comment" name="comment" rel="limited[250]" rows="20"></textarea>
	
		B.) Inline:
		You can also call the Limited TextArea Inline in your HTML.
		Options include:
		
			silent: true | false  "true is default. false is required to run inline"
			id: dom_id of element "pass in the id of the textarea you wish to limit words on."
			limit: 300 "pass in the limit on the word count for this textarea. Defaults to 300"
		
		Example:
		<textarea cols="40" id="comment" name="comment" rows="20"></textarea>
		<script type="text/javascript" charset="utf-8">
			limited = new LimitedTextArea({
				silent: false,
				id: 'comment'
			});
		</script>
*/


var LimitedTextArea = Class.create();
Object.extend(LimitedTextArea.prototype, {
	id: null,
	limit: 300,
	silent: true,
	initialize: function(options){
		Object.extend(this, options);
		if(this.silent){
			if (!document.getElementsByTagName){ return; }
			var textareas = document.getElementsByTagName('textarea');
			$A(document.getElementsByTagName('textarea')).each((function(e){
				var relAttribute = String(e.getAttribute('rel'));
				if(relAttribute.toLowerCase().match('limited')){
					if(relAttribute.match(/\[\d+\]/)){
						this.limit = parseInt(relAttribute.match(/\[(\d+)\]/)[1])
					}
					this.id = e.id;	
				}
			}).bind(this));
		}
		if(this.id != null){ this.monitor(); }
	},
	monitor: function(){
		new Form.Element.Observer($(this.id), 1, function(elem){
			text = elem.value;
			words = text.split(/\s+/)
			if (words.length > this.limit){
				alert("This field has a word limit of " + this.limit + " words.")
				elem.value = words.slice(0,(this.limit)).join(' ');
			}
		}.bind(this));
	}
});

function initLimitedTextArea() { new LimitedTextArea(); }
Event.observe(window, 'load', initLimitedTextArea, false);