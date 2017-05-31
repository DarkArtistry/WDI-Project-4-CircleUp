App.conversation = App.cable.subscriptions.create('ConversationChannel', {
  connected: function () {
    console.log(`connected`)
  },
  disconnected: function () {

  },
  received: function (data) {
    console.log('received something')
    console.log(JSON.stringify(data.message))

    var $msg = $(`<div style="display: block; position: relative; float: left; clear:both; background-color: white; border-radius:0.5em; padding:0.2em; margin:0.5em; box-shadow: 10px 10px 5px #888888; border: grey solid 0.05em;"><p>${data.message.content}</p></div>`)

    var $msg2 = $(`<div style="display: block; position: relative; float: right; clear:both; background-color: rgb(17, 217, 61); border-radius:0.5em; padding:0.2em; margin:0.5em; box-shadow: 10px 10px 5px #888888; border: grey solid 0.05em;"><p>${data.message.content}</p></div>`)
    console.log(data)
    console.log(data.message)

    if (data.sender === true) {
      var $targetbox = $(`#message${data.message.sender_id}${data.message.receiver_id}`)
      $targetbox.append($msg2)
    } else {
      var $targetbox = $(`#message${data.message.receiver_id}${data.message.sender_id}`)
      $targetbox.append($msg)
    }


    var $targetContentBox = $(`.MessageMainContent`)
    $targetContentBox.animate({ scrollTop: $targetContentBox.prop("scrollHeight")}, 1000)
    // return alert(JSON.stringify(data))
  }
})
