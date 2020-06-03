$(function(){
  function buildHTML(message){
    var messageImage = (message.image)? `<img src= "${message.image}" class="Message__image">`:`` 
      let html =
        `<div class="main__message-field__message" data-message-id=${message.id}>
          <div class="main__message-field__message__info">
            <div class="main__message-field__message__info__name">
              ${message.user_name}
            </div>
            <div class="main__message-field__message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__message-field__message__box">
            <p class="main__message-field__message__box__content">
              ${message.content}
            </p>
            ${messageImage}
          </div>
        </div>`
      return html;
  }

  $('.main__bottom__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main__message-field').append(html);      
      $('.main__message-field').animate({ scrollTop: $('.main__message-field')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $(".main__bottom__form__send-btn").prop('disabled', false);
      $('form')[0].reset();
    });
  });
});