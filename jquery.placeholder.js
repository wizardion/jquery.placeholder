/**
 * jquery.placeholder http://matoilic.github.com/jquery.placeholder
 *
 * @version v0.3.6
 * @author Alex Zarnitsa <alex@zarnitsa.net>
 * @copyright 2013 Alex Zarnitsa
 *
 */
/*----------------------------------------------------------------------------------------------------------------------
	Placeholder
/----------------------------------------------------------------------------------------------------------------------*/
(function() {
        var _S = window.$;
		
		_S.fn.placeholder = function()
		{
			var $self = this;
			var selector = ':input[placeholder]';
			
			(function() {
				var target = ($self.closest(selector)[0] != null)? $self.closest(selector) : 
					($self.find(selector)[0] != null)? $self.find(selector) : $self;				
							
				target.each(setPlaceholder);				
			})();
			
			//----------------------------------------------------------------------------------------------------------
			function setPlaceholder() {
				var target = $(this);
				var text = target.attr('placeholder');
				var title = target.attr('title');
				var span = $('<span style="position: relative; display: inline-block"></span>');				
				var placeholder = $('<span style="position: absolute; cursor: text;" class="placeholder"></span>');
				
				placeholder.css({'line-height': target.outerHeight() + 'px'});
				target.attr('title', title);
				placeholder.html("&nbsp;" + text);
				
				if(this.type == 'textarea') {
					placeholder.css({'line-height': 'normal' });
				}
				
				this.placeholder = placeholder;
				this.placeholder[0].target = target;
				target.wrap(span);
				target.before(placeholder);
				setEvents(target);
			}
			
			//----------------------------------------------------------------------------------------------------------
			function hidePlaceholder(target) {
				target.placeholder.hide();
			}
			
			//----------------------------------------------------------------------------------------------------------
			function showPlaceholder() {
				if($(this).val().length == 0) {
					this.placeholder.show();
				}
			}
			
			//----------------------------------------------------------------------------------------------------------
			function propertychange() {
				if (event.propertyName == "value") {
					hidePlaceholder(this);
				}
			}
			
			//----------------------------------------------------------------------------------------------------------
			function mousedown() {
				var target = this.target;
				setTimeout(function(){ target.focus(); }, 1);
			}
			
			//----------------------------------------------------------------------------------------------------------
			function setEvents(target) {
				target.bind('focus', function(){ hidePlaceholder(this); });
				target.bind('blur', showPlaceholder);
				target.each(function(){
					this.placeholder.mousedown(mousedown);
					this.onpropertychange = propertychange;
				});
			}
		};
		
		//----------------------------------------------------------------------------------------------------------
		(function() {
			var input = ('placeholder' in document.createElement('input'));
			var textarea = ('placeholder' in document.createElement('textarea'));
			
			if(!window.debug && input && textarea) {
				_S.fn.placeholder = function() {};
				return;
			}
		})();
})();