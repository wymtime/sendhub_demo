class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])

    if @user
      sign_in!(@user)
      
      redirect_to root_url
      #render json: @user, status: 200
    else
      #flash.now[:errors] = ["Invalid username/password"]
      #render :new, status: 401
      render json: "wrong username/password", status: 200
    end
  end

  def destroy
    sign_out!
    redirect_to root_url
  end
end
