#authored by owyongsk on github: https://github.com/owyongsk/ruby-sendhub

class SendHub
	include HTTParty

	attr_accessor :api_key, :number

	headers  "Content-Type" => "application/json"
	
	def initialize(api_key = nil, number = nil)
		@number = number
		@api_key = api_key
	end

	def method_missing(method, options = {})
		meth = method.to_s.split("_")
		if meth.first == "put" || meth.first == "delete"
			if meth.last == "messages"
				api_url = base_url + meth.last + "/" + options[:id].to_s + credentials
				options.delete(:id)
			else
				api_url = base_url + meth.last + "/" + options[:id].to_s + credentials
			end
		elsif meth.first == "get" && (meth.last == "threads" || meth.last == "messages" || !options[:id].nil?)
		  api_url = base_url + meth.last + "/" + options[:id].to_s + credentials
		else
			api_url = base_url + meth.last + credentials
		end
		ret = send_request(meth.first, api_url, :body => options.to_json)
		ret.nil? && meth.first == "delete" ? "Aaaand it's gone" : ret
	end
  
  #retrieve list of contacts
  def get_contacts(options = {})
    send_request("get", contacts_url, body: options.to_json)
  end
  
  #add a contact
  def post_contacts(options = {})
    if options[:name].nil? || options[:number].nil?
      return "Name or number cannot be blank"
    end
    if options[:number].length == 12 && options[:number].start_with?('+1')
      options[:number] = options[:number][2..-1]
    end
    unless options[:number].length == 10
      return "Number must be 10 digits long"
    end 
    if !!options[:number].match(/[^\d+]/)
      return "Number must contain only digits"
    end
    send_request("post", contacts_url, body: options.to_json)
  end
  
  #edit a contact
  def put_contact(options = {})
    send_request("put", update_contacts_url(options), body: options.to_json)
  end
  
  #send a message
  def post_messages(options = {})
    if options[:contacts].empty?
      return "Please enter contacts"
    end
    if options[:text].empty?
      return "Please enter text"
    end
    send_request("post", messages_url, body: options.to_json)
  end
  
  #retrieve a thread
  def get_thread(options = {})
    send_request("get", threads_url(options), body: options.to_json)
  end

	def get_groups_contacts(options = {})
		send_request("get", group_contacts_url(options), :body => options.to_json)
	end

	def post_groups_contacts(options = {})
		send_request("post", group_contacts_url(options), :body => options.to_json)
	end

	private
  
  def contacts_url()
    "#{base_url}contacts/#{credentials}"
  end
  
  def update_contacts_url(options)
    "#{base_url}contacts/#{options[:id].to_s}/#{credentials}"
  end
  
  def messages_url()
    "#{base_url}messages/#{credentials}"
  end
  
  def threads_url(options)
    "#{base_url}threads"
  end

	def group_contacts_url(options)
    "#{base_url}groups/#{options[:id]}/contacts/#{credentials}"
	end

	def send_request(request_type, url, json)
		self.class.send(request_type, url, json).parsed_response
	end

	def base_url
		"https://api.sendhub.com/v1/"
	end

	def credentials
		"?username=#{number}&api_key=#{api_key}"
	end

end