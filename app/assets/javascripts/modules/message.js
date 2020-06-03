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

//   let reloadMessages = function() {
//     //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
//     let last_message_id = $('main__message-field__message:last').data("message-id");
//     $.ajax({
//       //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
//       url: "api/messages",
//       //ルーティングで設定した通りhttpメソッドをgetに指定
//       type: 'get',
//       dataType: 'json',
//       //dataオプションでリクエストに値を含める
//       data: {id: last_message_id}
//     })
//     .done(function(messages) {
//       // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
//       if (messages.length !== 0) {
//         //追加するHTMLの入れ物を作る
//         let insertHTML = '';
//         //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
//         $.each(messages, function(i, message) {
//           insertHTML += buildHTML(message)
//         });
//         //メッセージが入ったHTMLに、入れ物ごと追加
//         $('.main__message-field').append(insertHTML);
//         $('.main__message-field').animate({ scrollTop: $('.main__message-field')[0].scrollHeight});
//       }
//     })
//     .fail(function() {
//       alert('error');
//     });
//   };
//   setInterval(reloadMessages, 7000);
});