module Api
  class ContactsController < ApplicationController
    def index
      contact_objects = $send_hub.get_contacts['objects']
      @contacts = contact_objects.map { |obj| { name: obj['name'], 
                                                phone_number: obj['number'],
                                                id_str: obj['id_str']} }
    end
    
    def create
      contact_info = $send_hub.post_contacts({ name: contact_params[:name], 
                                               number: contact_params[:phone_number] })
      
                                             
      if contact_info.is_a?(String)
        render json: contact_info, status: 401
      elsif contact_info['number'] == ["Invalid phone number"]
        render json: "Invalid phone number", status: 401
      else
        render json: @contact
      end
    end
    
    private
    
    def contact_params
      params.require(:contact).permit(:name, :phone_number, :user_id)
    end
  end
end