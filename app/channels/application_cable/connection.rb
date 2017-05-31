module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

   def connect
     puts 'check connection'
     self.current_user = find_verified_user
    #  puts 'current_user' + self.current_user. + ' ' + env['warden'].user
   end

   protected

   def find_verified_user
     if (current_user = env['warden'].user)
       current_user
     else
       reject_unauthorized_connection
     end
   end
 end
end
