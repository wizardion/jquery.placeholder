/**
 * jquery.placeholder http://matoilic.github.com/jquery.placeholder
 *
 * @version v0.1.2
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
				var target = ($self.closest(selector)[0] != null)? $self.closest(selector) : $self.find(selector);
				setEvents(target);
				target.each(setPlaceholder);
				target.blur();
			})();
			
			//----------------------------------------------------------------------------------------------------------
			function setPlaceholder() {
				var target = $(this);
				var placeholder = target.attr('placeholder');
				
				if(target.val().length == 0) {
					if(target.is(':password')) {
						if(this.clone == null) {
							var cloneID = target.attr('id') + '-clone';
							var clone = $(target[0].outerHTML.replace(/type=(['"])?password\1/gi, 'type=$1text$1'))
										.attr({value: placeholder, 'data-password': true, id: cloneID})
										.addClass('placeholder');
							
							target.before(clone).hide();
							setEvents(clone);
							this.clone = clone;
							this.clone[0].orign = target;
						}
						else
						{
							target.hide();
							this.clone.show();
						}
					}else{
						target.val(placeholder);
						target.attr({'data-placeholder': true});
						target.addClass('placeholder');
					}
				}
			}
			
			//----------------------------------------------------------------------------------------------------------
			function removePlaceholder() {
				var target = $(this);
				
				if(target.is('[data-placeholder]')) {				
					target.val('');
					target.removeAttr('data-placeholder');
					target.removeClass('placeholder');
				}
				
				if(target.is('[data-password]')) {
					this.orign.show().focus();
					
				}	
			}
			
			//----------------------------------------------------------------------------------------------------------
			function propertychange() {
				if (event.propertyName == "value") {
					var target = $(this.clone);
					
					if(target.is('[data-password]')) {
						setTimeout(function(){ target.hide(); }, 1);
						target[0].orign.show();
					}
				}
			}
			
			//----------------------------------------------------------------------------------------------------------
			function setEvents(target) {
				target.bind('blur.placeholder', setPlaceholder);
				target.bind('focus.placeholder', removePlaceholder);
				target.each(function(){
					if($(this).is(':password'))
					{
						this.onpropertychange = propertychange;
					}
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