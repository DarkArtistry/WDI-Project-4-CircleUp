class MessagesController < ApplicationController

  def index
    @uniqueUser = []
    @targetMessage = []

    @messages = Message.where(sender_id: current_user.id)
    @messages += Message.where(receiver_id: current_user.id)
    @messages.sort! { |a,b| b[:created_at] <=> a[:created_at] }

    @messages.each do |m|
      if (m[:sender_id] != current_user.id)
        if (!@uniqueUser.include?(m[:sender_id]))
          @uniqueUser.push(m[:sender_id])
          @targetMessage.push(m)
        end
      else
        if (!@uniqueUser.include?(m[:receiver_id]))
          @uniqueUser.push(m[:receiver_id])
          @targetMessage.push(m)
        end
      end
    end
  @targetMessage

  end

  def show
    @messages = Message.where(sender_id: current_user.id, receiver_id: params["id"]).or Message.where(sender_id: params["id"], receiver_id: current_user.id)

    puts params.inspect
    @targetUserID = params["id"]
    @message = Message.new
    @user = User.where(id: params["id"])[0]
  end


  def create
    puts params["message"]["targerUser"]
    puts params.inspect
    @message = Message.new(filter_params)
    @message.sender_id = current_user.id
    @message.status = 'unread'
    # puts @message.inspect
    if @message.save
    #   ActionCable.broadcast(<stream>,<message>)
    # ActionCable.server.broadcast( "conversations-#{@message.receiver_id}",
    # message: @message
    # )

    ActionCable.server.broadcast("conversation_channel#{@message.receiver_id}", {message: @message, sender: false})

    ActionCable.server.broadcast("conversation_channel#{@message.sender_id}", {message: @message, sender: true})
    end
    # redirect_to "/messages/#{@message.receiver_id}"
  end

  private

  def filter_params
    params.require(:message).permit(:content, :receiver_id)
  end

end
