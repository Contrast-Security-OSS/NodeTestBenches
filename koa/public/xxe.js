/* global $ */
$(() => {
  $('#attack-xml').after(
    $('<button>')
      .text('Unsafe')
      .attr('type', 'button')
      .addClass('is-safe left btn btn-default active')
      .on('click', (e) => {
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
      .on('click', (e) => {
        const elem = $(e.target);
        const form = elem.closest('form');

        elem.addClass('active');
        elem.siblings('.is-safe').removeClass('active');
        form.attr('action', '/xxe/safe');
      })
  );
});
