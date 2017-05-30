class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  #
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    super
    puts 'omgggggggggg'
    puts params.inspect
    @User = User.where(email: params["user"]["email"])[0]


    if params[:user][:profilepic]
      puts params[:user][:profilepic].inspect
      uploaded_file = params[:user][:profilepic].path
      cloudnary_file = Cloudinary::Uploader.upload(uploaded_file)
      @User.profilepic = cloudnary_file['url']
    end

    if params[:user][:bannerpic]
      uploaded_file2 = params[:user][:bannerpic].path
      cloudnary_file2 = Cloudinary::Uploader.upload(uploaded_file2)
      @User.bannerpic = cloudnary_file2['url']
    end
    @User.save
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
