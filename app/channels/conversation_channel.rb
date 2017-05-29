class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "conversation_channel#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive (data)
    puts 'received bcjdbjsomethin g'
    puts data
    ActionCable.server.broadcast("conversation_channel#{message.receiver_id}", {data: 'hello'})
  end
end
