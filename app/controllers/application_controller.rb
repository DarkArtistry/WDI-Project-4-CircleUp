class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
 # JSON.parse(User.all.to_json)

 @@userss = User.all

  protected

  def configure_permitted_parameters

    devise_parameter_sanitizer.permit(:sign_up, keys: %i[firstname lastname dob industry occupation country education company profilepic bannerpic])

    devise_parameter_sanitizer.permit(:account_update, keys: %i[firstname lastname dob industry occupation country education company profilepic bannerpic])
  end

end
