from flask import Flask,  request
import ticketMasterQuery as tmq


# EB looks for an 'application' callable by default.
application = Flask(__name__)

# add a rule for the index page.
# @application.route("//")
@application.route('/')
def root():
    return '<div><a href="/Event/">Root</a></div>'

@application.route("/Event/")
def Event(name = "search"):
    with open("./templates/events.html", encoding='utf-8') as f:
        html = f.read()
    return html


@application.route("/Event/submit_form", methods=['GET'])
def submit_form():
    header = request.headers
    query_string:str = header.environ['QUERY_STRING']
    form_content = dict(i.split('=') for i in query_string.split('&'))
    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        ip = (request.environ['REMOTE_ADDR'])
    else:
        ip = (request.environ['HTTP_X_FORWARDED_FOR']).split(',')[0] # if behind a proxy
    form_content['ip'] = ip;
    result = tmq.query_result(form_content);
    return result;

@application.route("/Event/detail")
def detail_fetch():
    header = request.headers
    query_string:str = header.environ['QUERY_STRING']
    form_content = dict(i.split('=') for i in query_string.split('&'))
    result = tmq.query_detail(form_content);
    return result;

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    # application.debug = True
    application.run()