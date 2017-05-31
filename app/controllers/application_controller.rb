class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  protect_from_forgery with: :exception
  # skip_before_action :verify_authenticity_token
  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

  def configure_permitted_parameters

    devise_parameter_sanitizer.permit(:sign_up, keys: %i[firstname lastname dob industry occupation country education company profilepic bannerpic])

    devise_parameter_sanitizer.permit(:account_update, keys: %i[firstname lastname dob industry occupation country education company profilepic bannerpic])
  end

end
