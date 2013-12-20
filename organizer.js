(function(){
	var O = function(params){
		return new Organizer(params);
	}

	var Organizer = function(params){
	}

	require = {
		cfg: {
			/**
			 * All folder below, will depart from jsFolder variable.
			 */
			jsFolder: 'js',		

			/**
			 * That folder should keep the libraries.
			 * Such as: jQuery, holder.js etc
			 */
			libFolder: 'lib',

			/**
			 * The directory that keeps the models files.
			 * Codes that keeps the website code and stuff.
			 */
			modelsFolder: 'models',

			cssFolder: 'css'
		},

		config: function (config){
			if(config == '' || config == null)
				return require.cfg;
			else require.cfg = config;
		},

		dir: function(type){
			var ret=false;

			switch(type){				
				case 'lib':
					ret = require.config().jsFolder+'/'+require.config().libFolder+'/';
				break;

				case 'models':
					ret = require.config().jsFolder+'/'+require.config().modelsFolder+'/';
				break;

				case 'css':
					ret = require.config().cssFolder+'/';
				break;
			}

			return ret;
		},

		/**
		 * require.createElement({
		 * 	element: 'script',
		 * 	type: 'text/javascript'
		 * })
		 */
		createElement: function (params)
		{
			var element=document.createElement(params.element);

			for(var i in params)
			{
				eval('element.'+i+'=params[i]')
			}

			return element;
		},

		// Get the js file informations by XML and HTTP.
		getScript : function (file){
			var xhrObj = new XMLHttpRequest();
			xhrObj.open('GET', file+'.js', false);
			xhrObj.send('');
			return xhrObj;
		},

		createNode: {
			/**
			 * The path to the .js file. Without the .js extension.
			 */		
			script: function (file)
			{
				file=file+'.js';

				var node = document.createElement('script');
				node.type = 'text/javascript';
				node.async=false;
				node.src=file;
				node.defer = true;
				node.language='javascript';
				//node.text=xhrObj.responseText; /* It is not safe, uncomment this line. */
				return node;
			},

			stylesheet: function(file)
			{
				var node = document.createElement('link');
				node.rel='stylesheet';
				node.type='text/css';
				node.media = 'all';
				node.href=require.dir('css')+file+'.css';
				return node;
			}
		},

		appendScript: function(src, callback, tagName){
			var element;

			element==null || element=='' ? 
				element = document.getElementsByTagName('head')[0] : 
				element=document.getElementsByTagName(tagName)[0];

			var node = require.createNode.script(src);
			node.onload=callback;
			node.onreadystatechange=callback;
			return element.appendChild(node)
		},

		Js:

		/**
		 * This function load a .js file and add the file to the
		 * $(element), or if you let this param empty, the code will
		 * put the tag in the head layout.
		 */
		function (src, callback, tagName) {
			return require.appendScript(require.config().jsFolder+'/'+src, callback, tagName);
		},

		Model: function(src, element)
		{
			src=require.dir('models')+src;
			return require.appendScript(src, element);
		},

		Lib: function(src, element)
		{
			src=require.dir('lib')+src;
			return require.appendScript(src, element);
		},
		
		Css: function (href)
		{
			var node = require.createNode.stylesheet(href);
			return document.head.appendChild(node);			
		}
	}

	dir = function(type){return require.dir(type)}

	if(!window.O){window.O=O}
})();