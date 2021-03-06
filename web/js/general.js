$(function(){

	$('body').on('click', 'a[data-confirm]', function(e){
		e.preventDefault();
		$('#confirm').remove();
		$('body').append('<div id="confirm" class="modal hide fade"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>Confirm</h3></div><div class="modal-body"><p>'+$(this).data('confirm')+'</p></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button><a class="btn btn-warning ' + $(this).attr('class') + '" href="' + $(this).attr('href') +'">' + $(this).html() + '</a></div></div>');
		$('#confirm').modal('show');
	});

	$('body').on('click', 'button[data-confirm]', function(e){
		e.preventDefault();
		$('#confirm').remove();
		$(this).after('<div id="confirm" class="modal hide fade"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>Confirm</h3></div><div class="modal-body"><p>'+$(this).data('confirm')+'</p></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button>' + $(this).clone().removeAttr('data-confirm').get(0).outerHTML + '</div></div>');
		$('#confirm').modal('show');
	});

	$('body').on('change', 'select[data-confirm]', function(e) {
		var $this = $(this);
		var initial = $this.data('initial');
		var confirm = $this.closest('form').find($this.data('confirm'));

		if ($this.val() === initial) {
			confirm.prop('disabled', true);
		} else {
			confirm.prop('disabled', false);
			confirm.show();
		}
	});

	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();

	$(document).on('shown', 'a[data-toggle="tab"]', function(e){
		$($(e.target).attr('href')).removeAttr('disabled');
		$($(e.relatedTarget).attr('href')).attr('disabled', 'disabled');
	});

	$(document).on('click', '*[data-toggle="enable"]', function(e){
		$($(e.target).data('href')).each(function(){
			$(this)
				.toggleClass('muted')
				.prop('disabled', ! $(this).prop('disabled'));
		});
	});

	$('.accordion')
		.on('shown', function (e) {
			$(e.target).removeAttr('disabled');
		})
		.on('hide', function (e) {
			$(e.target).attr('disabled', 'disabled');
		});

	$('body').on('change', '#pagination-slider', function(e){
		$('#pagination-input').val($(this).val()).focus();
	});

	$('body').on('change', '#pagination-input', function(e){
		$('#pagination-slider').val($(this).val());
	});

	$('.pagination-control').hover(function(){$(this).children().toggle();}, function(){$(this).children().toggle();});

	$(".chzn-select").chosen();

	$("*[data-load-remote]").each(function() {
		$(this)
			.addClass('progress')
			.load($(this).data('loadRemote'), function(content, textStatus) {
				$(this).removeClass('progress');
				if (textStatus !== 'success') {
					$(this).addClass('error');
				}
			});
	});

	$('body').on('click', 'td', function(e) {
		if ($(e.target).closest('table table').length) {
			e.stopPropagation();
		}

		if (e.target && ['a', 'button', 'input', 'select', 'textarea', 'label'].indexOf(e.target.nodeName.toLowerCase()) === -1)
		{
			$(this).closest('tr').children('td:first').find('input[type="checkbox"]').each(function(){
				$(this).click();
			});
		}
	});

	$('body').on('change', 'input[name="all"]', function(e){
		$(this).closest('table').find('tbody > tr > td:first-child input[type="checkbox"]').prop('checked', $(this).prop('checked'));
	});

	$('body').on('click', '[data-toggle="modal"]', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		if (url.indexOf('#') === 0) {
			$(url).modal('open');
		} else {
			$.get(url, function(data) {
				$('<div class="modal hide fade">' + data + '</div>').modal();
			}).success(function() { $('input:text:visible:first').focus(); });
		}
	});
	
	$('body').on('change', 'select[data-select-custom]', function(){
		if ($(this).val() == 'custom') {
			$($(this).data('select-custom')).addClass('in').removeAttr('disabled');
		}
		else
		{
			$($(this).data('select-custom')).removeClass('in').attr('disabled', 'disabled');
		}
	});

	$('body').on('submit', 'form[data-provide="async"]', function(e){
		var $form = $(this);
		var $target = $form.attr('data-target') ? $($form.attr('data-target')) : $form;

		e.preventDefault();

		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),

			success: function(data, status) {
				$target.replaceWith(data);
			}
		});
	});

	$('.dropdown-toggle').click(function(e) {
	  e.preventDefault();
	  setTimeout($.proxy(function() {
	    if ('ontouchstart' in document.documentElement) {
	      $(this).siblings('.dropdown-backdrop').off().remove();
	    }
	  }, this), 0);
	});
});
