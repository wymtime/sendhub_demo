module Api
  class MessagesController < ApplicationController
    def create
      message_info = $send_hub.post_messages({contacts: message_params[:contacts], 
                                              text: message_params[:text]})
      
      if message_info.is_a?(String)
        render json: message_info, status: 401
      else
        render json: @message
      end
    end
    
    private
    
    def message_params
      params.require(:message).permit(:text, :user_id, :contacts => [])
    end
  end
end